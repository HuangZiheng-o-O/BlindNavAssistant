#!/usr/bin/env python
# license removed for brevity
import rospy  # rostalker
from std_msgs.msg import String
# limit the number of cpus used by high performance libraries
import os
# import pyttsx3
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["OPENBLAS_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["VECLIB_MAXIMUM_THREADS"] = "1"
os.environ["NUMEXPR_NUM_THREADS"] = "1"

import sys
sys.path.insert(0, './yolov5')

import argparse
import os
import platform
import shutil
import time
from pathlib import Path
import cv2
import torch
import torch.backends.cudnn as cudnn

from yolov5.models.experimental import attempt_load
from yolov5.utils.downloads import attempt_download
from yolov5.models.common import DetectMultiBackend
from yolov5.utils.datasets import LoadImages, LoadStreams
from yolov5.utils.general import (LOGGER, check_img_size, non_max_suppression, scale_coords, 
                                  check_imshow, xyxy2xywh, increment_path)
from yolov5.utils.torch_utils import select_device, time_sync
from yolov5.utils.plots import Annotator, colors
from deep_sort.utils.parser import get_config
from deep_sort.deep_sort import DeepSort
# import pyttsx3  #语音




FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]  # yolov5 deepsort root directory
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))  # add ROOT to PATH
ROOT = Path(os.path.relpath(ROOT, Path.cwd()))  # relative

dict1 = {'person':'行人','bicycle':'自行车','car':'汽车','motorcycle':'摩托车','airplane':'飞机','bus':'公交车','train:':'火车',
         'truck':'卡车','boat':'船','traffic light':'交通灯','fire hydrant':'消防栓','stop sign':'停车标志','parking meter':'停车收费表',
         'bench':'长椅','bird':'鸟','cat':'猫','dog':'狗','horse':'马','sheep':'羊','cow':'牛','skis':'滑水板','snowboard':'滑雪板',
         'sports ball':'运动球', 'kite':'风筝','baseball bat':'棒球棒','baseball glove':'棒球手套','skateboard':'滑板','surfboard':'冲浪板',
         'tennis racket':'网球拍','bottle':'瓶子','wine glass':'酒杯','cup':'杯子','fork':'叉子','knife':'刀','spoon':'勺子','bowl':'碗',
         'banana':'香蕉','apple':'苹果','sandwich':'三明治','orange':'橘子','broccoli':'西兰花','carrot':'胡萝卜','hot dog':'热狗','pizza':'比萨饼',
         'donut':'甜甜圈','cake':'蛋糕','chair':'椅子','couch':'沙发','potted plant':'盆栽植物','bed':'床','dining table':'餐桌','toilet':'厕所',
         'tv':'电视机','laptop':'笔记本电脑','mouse':'鼠标','remote':'遥控器','keyboard':'键盘','cell phone':'手机','microwave':'微波炉',
         'oven':'烤箱','toaster':'烤面包机','sink':'水池','refrigerator':'冰箱','book':'书','clock':'时钟','vase':'花瓶','scissors':'剪刀',
         'teddy bear':'泰迪熊','hair drier':'吹风机','toothbrush':'牙刷','stair':'台阶','trash':'垃圾桶'}

dict2 = {'person':'个','bicycle':'辆','car':'辆','motorcycle':'辆','airplane':'架','bus':'辆','train:':'列',
         'truck':'辆','boat':'条','traffic light':'个','fire hydrant':'个','stop sign':'个','parking meter':'个',
         'bench':'个','bird':'只','cat':'只','dog':'只','horse':'匹','sheep':'只','cow':'头','skis':'个','snowboard':'个',
         'sports ball':'个', 'kite':'个','baseball bat':'个','baseball glove':'副','skateboard':'个','surfboard':'个',
         'tennis racket':'副','bottle':'个','wine glass':'个','cup':'个','fork':'把','knife':'把','spoon':'把','bowl':'个',
         'banana':'个','apple':'个','sandwich':'块','orange':'个','broccoli':'个','carrot':'个','hot dog':'个','pizza':'个',
         'donut':'个','cake':'个','chair':'把','couch':'个','potted plant':'个','bed':'个','dining table':'个','toilet':'个',
         'tv':'台','laptop':'台','mouse':'个','remote':'个','keyboard':'个','cell phone':'个','microwave':'个',
         'oven':'个','toaster':'个','sink':'个','refrigerator':'个','book':'本','clock':'个','vase':'个','scissors':'把',
         'teddy bear':'个','hair drier':'个','toothbrush':'个','stair':'个','trash':'个'}
# 语音输出-----原来的！！！！！
#def say(text):
    # engine = pyttsx3.init()
    # #调整声音
    # voices = engine.getProperty('voices')
    # voice = engine.getProperty('voice')
    # #0-500
    # rate = engine.getProperty('rate')
    # #0-1
    # volume = engine.getProperty('volume')
    # # print(voice,rate,volume)
    # # engine.setProperty('rate',200)
    # engine.setProperty('volume',0.8)
    # engine.say(text)
    # engine.runAndWait()

#rostalker发布
def say(text):
    #text就是要发布过去的内容，格式形如#前方有：6个行人,1辆汽车,3辆摩托车,
    pub = rospy.Publisher('chatter', String, queue_size=10)   # chatter 是话题名
    rospy.init_node('talker', anonymous=True)       #talker 是节点使用的名称
    rate = rospy.Rate(10) # 10hz    会让名称末尾添加随机数，来确保节点具有唯一的名称
    # while not rospy.is_shutdown():
    hello_str = text+"%s" % rospy.get_time()   #test是传过来的变量，是要说的话
    rospy.loginfo(hello_str)   #打印消息到屏幕上；把消息写入节点的日志文件中；写入rosout。
    pub.publish(hello_str)
    rate.sleep()  #睡眠，可以用来调速率
    #以上所有报错都是没包的问题

def detect(opt):
    out, source, yolo_model, deep_sort_model, show_vid, save_vid, save_txt, imgsz, evaluate, half, project, name, exist_ok= \
        opt.output, opt.source, opt.yolo_model, opt.deep_sort_model, opt.show_vid, opt.save_vid, \
        opt.save_txt, opt.imgsz, opt.evaluate, opt.half, opt.project, opt.name, opt.exist_ok
    webcam = source == '0' or source.startswith(
        'rtsp') or source.startswith('http') or source.endswith('.txt')

    device = select_device(opt.device)
    # initialize deepsort
    cfg = get_config()
    cfg.merge_from_file(opt.config_deepsort)
    deepsort = DeepSort(deep_sort_model,
                        device,
                        max_dist=cfg.DEEPSORT.MAX_DIST,
                        max_iou_distance=cfg.DEEPSORT.MAX_IOU_DISTANCE,
                        max_age=cfg.DEEPSORT.MAX_AGE, n_init=cfg.DEEPSORT.N_INIT, nn_budget=cfg.DEEPSORT.NN_BUDGET,
                        )

    # Initialize
    half &= device.type != 'cpu'  # half precision only supported on CUDA

    # The MOT16 evaluation runs multiple inference streams in parallel, each one writing to
    # its own .txt file. Hence, in that case, the output folder is not restored
    if not evaluate:
        if os.path.exists(out):
            pass
            shutil.rmtree(out)  # delete output folder
        os.makedirs(out)  # make new output folder

    # Directories
    exp_name = yolo_model.split(".")[0] if type(yolo_model) is str else "ensemble"
    exp_name = exp_name + "_" + deep_sort_model
    save_dir = increment_path(Path(project) / exp_name, exist_ok=exist_ok)  # increment run if project name exists
    save_dir.mkdir(parents=True, exist_ok=True)  # make dir

    # Load model
    device = select_device(device)
    model = DetectMultiBackend(yolo_model, device=device, dnn=opt.dnn)
    stride, names, pt, jit, _ = model.stride, model.names, model.pt, model.jit, model.onnx
    imgsz = check_img_size(imgsz, s=stride)  # check image size

    # Half
    half &= pt and device.type != 'cpu'  # half precision only supported by PyTorch on CUDA
    if pt:
        model.model.half() if half else model.model.float()

    # Set Dataloader
    vid_path, vid_writer = None, None
    # Check if environment supports image displays
    if show_vid:
        show_vid = check_imshow()

    # Dataloader
    if webcam:
        show_vid = check_imshow()
        cudnn.benchmark = True  # set True to speed up constant image size inference
        dataset = LoadStreams(source, img_size=imgsz, stride=stride, auto=pt and not jit)
        bs = len(dataset)  # batch_size
    else:
        dataset = LoadImages(source, img_size=imgsz, stride=stride, auto=pt and not jit)
        bs = 1  # batch_size
    vid_path, vid_writer = [None] * bs, [None] * bs

    # Get names and colors
    names = model.module.names if hasattr(model, 'module') else model.names

    # extract what is in between the last '/' and last '.'
    txt_file_name = source.split('/')[-1].split('.')[0]
    txt_path = str(Path(save_dir)) + '/' + txt_file_name + '.txt'

    if pt and device.type != 'cpu':
        model(torch.zeros(1, 3, *imgsz).to(device).type_as(next(model.model.parameters())))  # warmup
    dt, seen = [0.0, 0.0, 0.0, 0.0], 0
    for frame_idx, (path, img, im0s, vid_cap, s) in enumerate(dataset):
        t1 = time_sync()
        img = torch.from_numpy(img).to(device)
        img = img.half() if half else img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)
        t2 = time_sync()
        dt[0] += t2 - t1

        # Inference
        visualize = increment_path(save_dir / Path(path).stem, mkdir=True) if opt.visualize else False
        pred = model(img, augment=opt.augment, visualize=visualize)
        t3 = time_sync()
        dt[1] += t3 - t2

        # Apply NMS
        pred = non_max_suppression(pred, opt.conf_thres, opt.iou_thres, opt.classes, opt.agnostic_nms, max_det=opt.max_det)
        dt[2] += time_sync() - t3
        # Process detections
        start_time = time.time()
        for i, det in enumerate(pred):  # detections per image
            now_time = time.time()
            seen += 1
            if webcam:  # batch_size >= 1
                p, im0, _ = path[i], im0s[i].copy(), dataset.count
                s += f'{i}: '
            else:
                p, im0, _ = path, im0s.copy(), getattr(dataset, 'frame', 0)

            p = Path(p)  # to Path
            save_path = str(save_dir / p.name)  # im.jpg, vid.mp4, ...
            s += '%gx%g ' % img.shape[2:]  # print string

            annotator = Annotator(im0, line_width=2, pil=not ascii)

            if det is not None and len(det):
                # Rescale boxes from img_size to im0 size
                det[:, :4] = scale_coords(
                    img.shape[2:], det[:, :4], im0.shape).round()

                # Print results   #此处有语音
                text = "前方有："
                for c in det[:, -1].unique():
                    n = (det[:, -1] == c).sum()  # detections per class
                    s += f"{n} {names[int(c)]}{'s' * (n > 1)}, "  # add to string
                    if frame_idx % 100==0:
                        n = str(int(n))
                        c = names[int(c)]
                        text += n+dict2[c]+dict1[c]+","
                if frame_idx % 100==0:
                    # print("text:",text)   #前方有：6个行人,1辆汽车,3辆摩托车,
                    try:
                        say(text)
                    except rospy.ROSInterruptException:
                        pass
                    #此处也是包的问题
                    text = ""
                        
                xywhs = xyxy2xywh(det[:, 0:4])
                confs = det[:, 4]
                clss = det[:, 5]

                # pass detections to deepsort
                t4 = time_sync()
                outputs = deepsort.update(xywhs.cpu(), confs.cpu(), clss.cpu(), im0)
                t5 = time_sync()
                dt[3] += t5 - t4

                # draw boxes for visualization
                if len(outputs) > 0:
                    for j, (output, conf) in enumerate(zip(outputs, confs)):

                        bboxes = output[0:4]
                        id = output[4]
                        cls = output[5]

                        c = int(cls)  # integer class
                        label = f'{id} {names[c]} {conf:.2f}'
                        annotator.box_label(bboxes, label, color=colors(c, True))

                        if save_txt:
                            # to MOT format
                            bbox_left = output[0]
                            bbox_top = output[1]
                            bbox_w = output[2] - output[0]
                            bbox_h = output[3] - output[1]
                            # Write MOT compliant results to file
                            with open(txt_path, 'a') as f:
                                f.write(('%g ' * 10 + '\n') % (frame_idx + 1, id, bbox_left,  # MOT format
                                                               bbox_top, bbox_w, bbox_h, -1, -1, -1, -1))

                LOGGER.info(f'{s}Done. YOLO:({t3 - t2:.3f}s), DeepSort:({t5 - t4:.3f}s)')

            else:
                deepsort.increment_ages()
                LOGGER.info('No detections')

            # Stream results
            im0 = annotator.result()
            if show_vid:
                cv2.imshow(str(p), im0)
                if cv2.waitKey(1) == ord('q'):  # q to quit
                    raise StopIteration

            # Save results (image with detections)
            if save_vid:
                if vid_path != save_path:  # new video
                    vid_path = save_path
                    if isinstance(vid_writer, cv2.VideoWriter):
                        vid_writer.release()  # release previous video writer
                    if vid_cap:  # video
                        fps = vid_cap.get(cv2.CAP_PROP_FPS)
                        w = int(vid_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                        h = int(vid_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                    else:  # stream
                        fps, w, h = 30, im0.shape[1], im0.shape[0]

                    vid_writer = cv2.VideoWriter(save_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (w, h))
                vid_writer.write(im0)

    # Print results
    t = tuple(x / seen * 1E3 for x in dt)  # speeds per image
    LOGGER.info(f'Speed: %.1fms pre-process, %.1fms inference, %.1fms NMS, %.1fms deep sort update \
        per image at shape {(1, 3, *imgsz)}' % t)
    if save_txt or save_vid:
        print('Results saved to %s' % save_path)
        if platform == 'darwin':  # MacOS
            os.system('open ' + save_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--yolo_model', nargs='+', type=str, default='yolov5s.pt', help='model.pt path(s)')     #默认改yolov5s了，快一点
    parser.add_argument('--deep_sort_model', type=str, default='osnet_ibn_x1_0_MSMT17')
    parser.add_argument('--source', type=str, default='0', help='source')  # file/folder, 0 for webcam
    parser.add_argument('--output', type=str, default='inference/output', help='output folder')  # output folder
    parser.add_argument('--imgsz', '--img', '--img-size', nargs='+', type=int, default=[640], help='inference size h,w')
    parser.add_argument('--conf-thres', type=float, default=0.5, help='object confidence threshold')
    parser.add_argument('--iou-thres', type=float, default=0.5, help='IOU threshold for NMS')
    parser.add_argument('--fourcc', type=str, default='mp4v', help='output video codec (verify ffmpeg support)')
    parser.add_argument('--device', default='', help='cuda device, i.e. 0 or 0,1,2,3 or cpu')
    parser.add_argument('--show-vid', default=False, action='store_true', help='display tracking video results')  # 增加了 default=True, 直接默认开启
    parser.add_argument('--save-vid', default=True, action='store_true', help='save video tracking results')     # 增加了 default=True, 直接默认开启
    parser.add_argument('--save-txt', default=True, action='store_true', help='save MOT compliant results to *.txt')     # 增加了 default=True, 直接默认开启
    # class 0 is person, 1 is bycicle, 2 is car... 79 is oven
    parser.add_argument('--classes', nargs='+', type=int, help='filter by class: --class 0, or --class 16 17')
    parser.add_argument('--agnostic-nms', action='store_true', help='class-agnostic NMS')
    parser.add_argument('--augment', action='store_true', help='augmented inference')
    parser.add_argument('--evaluate', action='store_true', help='augmented inference')
    parser.add_argument("--config_deepsort", type=str, default="deep_sort/configs/deep_sort.yaml")
    parser.add_argument("--half", action="store_true", help="use FP16 half-precision inference")
    parser.add_argument('--visualize', action='store_true', help='visualize features')
    parser.add_argument('--max-det', type=int, default=1000, help='maximum detection per image')
    parser.add_argument('--dnn', action='store_true', help='use OpenCV DNN for ONNX inference')
    parser.add_argument('--project', default=ROOT / 'runs/track', help='save results to project/name')
    parser.add_argument('--name', default='exp', help='save results to project/name')
    parser.add_argument('--exist-ok', action='store_true', help='existing project/name ok, do not increment')
    opt = parser.parse_args()
    opt.imgsz *= 2 if len(opt.imgsz) == 1 else 1  # expand

    with torch.no_grad():
        detect(opt)
