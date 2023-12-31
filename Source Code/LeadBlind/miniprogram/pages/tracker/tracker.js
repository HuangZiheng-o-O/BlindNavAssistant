const app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    mapCtx: null,
    scale: 14,
    imageSrc: '/images/tracker/tracker-search.png',
    imageSpeedAdd: '/images/tracker/speed-add.png',
    imageSpeedSlow: '/images/tracker/speed-slow.png',
    imagePause: '/images/tracker/pause.png',
    imagePlay: '/images/tracker/play.png',
    mapCenter: {
      longitude: 113.324520,
      latitude: 23.099994
    },
    markers: [{ //标记点用于在地图上显示标记的位置
      iconPath: "/images/tracker/car.png",
      id: 1,
      width: 25,
      height: 40,
      longitude: 113.324520,
      latitude: 23.099994,
      rotate: 0, //旋转角度 默认0
      anchor: {
        x: .5,
        y: .5
      }, //经纬度在标注图标的锚点，默认底边中点 {x: .5, y: 1}
      callout: { //标记点上方的气泡窗口
        content: '轨迹回放',
        color: '#fff',
        fontSize: 16,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#07c160',
        bgColor: '#fff',
        padding: 5,
        textAlign: 'center',
        display: 'BYCLICK'
      },
    }],
    polylineSettings: [{ //路线
      points: [{latitude: 22.596206, longitude: 113.87317, gpsBearing: 244},{latitude: 22.596216, longitude: 113.873192, gpsBearing: 244},{latitude: 22.596213, longitude: 113.873177, gpsBearing: 244},{latitude: 22.596212, longitude: 113.873205, gpsBearing: 244},{latitude: 22.596155, longitude: 113.873147, gpsBearing: 244},{latitude: 22.59614, longitude: 113.87315, gpsBearing: 244},{latitude: 22.596122, longitude: 113.873146, gpsBearing: 244},{latitude: 22.596098, longitude: 113.873101, gpsBearing: 244},{latitude: 22.596123, longitude: 113.873095, gpsBearing: 244},{latitude: 22.59613, longitude: 113.873047, gpsBearing: 244},{latitude: 22.596154, longitude: 113.873006, gpsBearing: 244},{latitude: 22.596142, longitude: 113.873006, gpsBearing: 244},{latitude: 22.596131, longitude: 113.873009, gpsBearing: 244},{latitude: 22.596117, longitude: 113.873011, gpsBearing: 244},{latitude: 22.596112, longitude: 113.873014, gpsBearing: 244},{latitude: 22.596114, longitude: 113.873021, gpsBearing: 244},{latitude: 22.596122, longitude: 113.873029, gpsBearing: 244},{latitude: 22.596131, longitude: 113.873039, gpsBearing: 244},{latitude: 22.596127, longitude: 113.873046, gpsBearing: 244},{latitude: 22.596116, longitude: 113.873053, gpsBearing: 244},{latitude: 22.596097, longitude: 113.873055, gpsBearing: 244},{latitude: 22.596084, longitude: 113.87306, gpsBearing: 244},{latitude: 22.596074, longitude: 113.873069, gpsBearing: 244},{latitude: 22.596062, longitude: 113.873076, gpsBearing: 244},{latitude: 22.596046, longitude: 113.873075, gpsBearing: 244},{latitude: 22.596028, longitude: 113.873072, gpsBearing: 244},{latitude: 22.595997, longitude: 113.873047, gpsBearing: 244},{latitude: 22.595982, longitude: 113.873054, gpsBearing: 244},{latitude: 22.595967, longitude: 113.873067, gpsBearing: 244},{latitude: 22.595971, longitude: 113.873058, gpsBearing: 244},{latitude: 22.595975, longitude: 113.873046, gpsBearing: 244},{latitude: 22.595984, longitude: 113.873035, gpsBearing: 244},{latitude: 22.595992, longitude: 113.87303, gpsBearing: 244},{latitude: 22.59602, longitude: 113.87305, gpsBearing: 244},{latitude: 22.596017, longitude: 113.873057, gpsBearing: 244},{latitude: 22.596017, longitude: 113.873056, gpsBearing: 244},{latitude: 22.596011, longitude: 113.87305, gpsBearing: 244},{latitude: 22.596008, longitude: 113.873049, gpsBearing: 244},{latitude: 22.596006, longitude: 113.87305, gpsBearing: 244},{latitude: 22.596004, longitude: 113.873053, gpsBearing: 244},{latitude: 22.596004, longitude: 113.873054, gpsBearing: 244},{latitude: 22.595989, longitude: 113.873044, gpsBearing: 244},{latitude: 22.595996, longitude: 113.873051, gpsBearing: 244},{latitude: 22.596023, longitude: 113.873084, gpsBearing: 244},{latitude: 22.596033, longitude: 113.873076, gpsBearing: 244},{latitude: 22.59604, longitude: 113.873076, gpsBearing: 244},{latitude: 22.596041, longitude: 113.873077, gpsBearing: 244},{latitude: 22.596035, longitude: 113.87308, gpsBearing: 244},{latitude: 22.596023, longitude: 113.873069, gpsBearing: 244},{latitude: 22.59602, longitude: 113.873076, gpsBearing: 244},{latitude: 22.596019, longitude: 113.873085, gpsBearing: 244},{latitude: 22.596027, longitude: 113.873101, gpsBearing: 244},{latitude: 22.596018, longitude: 113.873105, gpsBearing: 244},{latitude: 22.596012, longitude: 113.873108, gpsBearing: 244},{latitude: 22.596008, longitude: 113.873111, gpsBearing: 244},{latitude: 22.596009, longitude: 113.873119, gpsBearing: 244},{latitude: 22.59601, longitude: 113.873126, gpsBearing: 244},{latitude: 22.596015, longitude: 113.873135, gpsBearing: 244},{latitude: 22.596017, longitude: 113.873143, gpsBearing: 244},{latitude: 22.596017, longitude: 113.873152, gpsBearing: 244},{latitude: 22.595972, longitude: 113.873132, gpsBearing: 244},{latitude: 22.595979, longitude: 113.873145, gpsBearing: 244},{latitude: 22.595982, longitude: 113.873143, gpsBearing: 244},{latitude: 22.595988, longitude: 113.873132, gpsBearing: 244},{latitude: 22.595988, longitude: 113.873128, gpsBearing: 244},{latitude: 22.59599, longitude: 113.873135, gpsBearing: 244},{latitude: 22.595992, longitude: 113.87314, gpsBearing: 244},{latitude: 22.596003, longitude: 113.873144, gpsBearing: 244},{latitude: 22.596007, longitude: 113.873157, gpsBearing: 244},{latitude: 22.596009, longitude: 113.873165, gpsBearing: 244},{latitude: 22.59602, longitude: 113.873171, gpsBearing: 244},{latitude: 22.596035, longitude: 113.873175, gpsBearing: 244},{latitude: 22.596044, longitude: 113.873179, gpsBearing: 244},{latitude: 22.596049, longitude: 113.873176, gpsBearing: 244},{latitude: 22.59605, longitude: 113.873174, gpsBearing: 244},{latitude: 22.596049, longitude: 113.873177, gpsBearing: 244},{latitude: 22.596048, longitude: 113.87318, gpsBearing: 244},{latitude: 22.596049, longitude: 113.873186, gpsBearing: 244},{latitude: 22.596052, longitude: 113.873188, gpsBearing: 244},{latitude: 22.596053, longitude: 113.873192, gpsBearing: 244},{latitude: 22.596049, longitude: 113.873199, gpsBearing: 244},{latitude: 22.59605, longitude: 113.873199, gpsBearing: 244},{latitude: 22.596054, longitude: 113.873201, gpsBearing: 244},{latitude: 22.596061, longitude: 113.873211, gpsBearing: 244},{latitude: 22.596063, longitude: 113.873215, gpsBearing: 244},{latitude: 22.596064, longitude: 113.87322, gpsBearing: 244},{latitude: 22.59607, longitude: 113.873222, gpsBearing: 244},{latitude: 22.596067, longitude: 113.873219, gpsBearing: 244},{latitude: 22.596063, longitude: 113.873215, gpsBearing: 244},{latitude: 22.59606, longitude: 113.873219, gpsBearing: 244},{latitude: 22.596061, longitude: 113.873213, gpsBearing: 244},{latitude: 22.595382, longitude: 113.873102, gpsBearing: 0},{latitude: 22.595395, longitude: 113.873132, gpsBearing: 0},{latitude: 22.595371, longitude: 113.873124, gpsBearing: 0},{latitude: 22.595353, longitude: 113.873115, gpsBearing: 0},{latitude: 22.595278, longitude: 113.873133, gpsBearing: 0},{latitude: 22.595199, longitude: 113.873142, gpsBearing: 0},{latitude: 22.594997, longitude: 113.87324, gpsBearing: 91},{latitude: 22.595042, longitude: 113.873372, gpsBearing: 157},{latitude: 22.595165, longitude: 113.873482, gpsBearing: 14},{latitude: 22.595167, longitude: 113.873615, gpsBearing: 264},{latitude: 22.595127, longitude: 113.873673, gpsBearing: 229},{latitude: 22.595109, longitude: 113.873692, gpsBearing: 229},{latitude: 22.595107, longitude: 113.873709, gpsBearing: 229},{latitude: 22.595105, longitude: 113.873715, gpsBearing: 229},{latitude: 22.595092, longitude: 113.873767, gpsBearing: 229},{latitude: 22.595017, longitude: 113.873925, gpsBearing: 113},{latitude: 22.594878, longitude: 113.873748, gpsBearing: 242},{latitude: 22.594688, longitude: 113.873477, gpsBearing: 223},{latitude: 22.594547, longitude: 113.873267, gpsBearing: 243},{latitude: 22.594415, longitude: 113.873053, gpsBearing: 228},{latitude: 22.594323, longitude: 113.872878, gpsBearing: 239},{latitude: 22.594276, longitude: 113.872889, gpsBearing: 242},{latitude: 22.594277, longitude: 113.872878, gpsBearing: 242},{latitude: 22.594272, longitude: 113.872867, gpsBearing: 242},{latitude: 22.594252, longitude: 113.872834, gpsBearing: 242},{latitude: 22.594366, longitude: 113.872594, gpsBearing: 321},{latitude: 22.594751, longitude: 113.872271, gpsBearing: 330},{latitude: 22.595176, longitude: 113.871885, gpsBearing: 327},{latitude: 22.595756, longitude: 113.87141, gpsBearing: 326},{latitude: 22.59617, longitude: 113.870976, gpsBearing: 293},{latitude: 22.595982, longitude: 113.870511, gpsBearing: 228},{latitude: 22.595925, longitude: 113.870396, gpsBearing: 231},{latitude: 22.595922, longitude: 113.870391, gpsBearing: 231},{latitude: 22.595921, longitude: 113.870391, gpsBearing: 231},{latitude: 22.595879, longitude: 113.870283, gpsBearing: 251},{latitude: 22.59587, longitude: 113.870271, gpsBearing: 255},{latitude: 22.59585, longitude: 113.870248, gpsBearing: 255},{latitude: 22.595844, longitude: 113.870242, gpsBearing: 255},{latitude: 22.595838, longitude: 113.870234, gpsBearing: 255},{latitude: 22.595833, longitude: 113.870228, gpsBearing: 255},{latitude: 22.595801, longitude: 113.870155, gpsBearing: 255},{latitude: 22.595781, longitude: 113.870103, gpsBearing: 257},{latitude: 22.59577, longitude: 113.870088, gpsBearing: 257},{latitude: 22.595768, longitude: 113.870055, gpsBearing: 257},{latitude: 22.595792, longitude: 113.870001, gpsBearing: 257},{latitude: 22.595883, longitude: 113.869913, gpsBearing: 311},{latitude: 22.596241, longitude: 113.869685, gpsBearing: 340},{latitude: 22.597061, longitude: 113.86915, gpsBearing: 327},{latitude: 22.597764, longitude: 113.868657, gpsBearing: 327},{latitude: 22.598526, longitude: 113.868166, gpsBearing: 330},{latitude: 22.599516, longitude: 113.867496, gpsBearing: 326},{latitude: 22.600336, longitude: 113.866976, gpsBearing: 328},{latitude: 22.601014, longitude: 113.866459, gpsBearing: 325},{latitude: 22.601759, longitude: 113.865882, gpsBearing: 319},{latitude: 22.602108, longitude: 113.865617, gpsBearing: 327},{latitude: 22.602445, longitude: 113.865335, gpsBearing: 322},{latitude: 22.604112, longitude: 113.863745, gpsBearing: 318},{latitude: 22.60445, longitude: 113.863392, gpsBearing: 314},{latitude: 22.604655, longitude: 113.863191, gpsBearing: 317},{latitude: 22.604844, longitude: 113.862974, gpsBearing: 326},{latitude: 22.606299, longitude: 113.861679, gpsBearing: 322},{latitude: 22.60691, longitude: 113.861282, gpsBearing: 332},{latitude: 22.607577, longitude: 113.860947, gpsBearing: 336},{latitude: 22.608198, longitude: 113.860659, gpsBearing: 338},{latitude: 22.608535, longitude: 113.860509, gpsBearing: 344},{latitude: 22.608922, longitude: 113.860322, gpsBearing: 332},{latitude: 22.609435, longitude: 113.860072, gpsBearing: 338},{latitude: 22.61004, longitude: 113.859761, gpsBearing: 334},{latitude: 22.610392, longitude: 113.859548, gpsBearing: 335},{latitude: 22.61047, longitude: 113.859458, gpsBearing: 338},{latitude: 22.610558, longitude: 113.859366, gpsBearing: 338},{latitude: 22.610873, longitude: 113.85919, gpsBearing: 333},{latitude: 22.611081, longitude: 113.859092, gpsBearing: 331},{latitude: 22.611356, longitude: 113.858966, gpsBearing: 340},{latitude: 22.611655, longitude: 113.858828, gpsBearing: 333},{latitude: 22.612054, longitude: 113.858623, gpsBearing: 334},{latitude: 22.612305, longitude: 113.858503, gpsBearing: 335},{latitude: 22.612555, longitude: 113.858369, gpsBearing: 335},{latitude: 22.612731, longitude: 113.858277, gpsBearing: 334},{latitude: 22.613101, longitude: 113.858116, gpsBearing: 343},{latitude: 22.613474, longitude: 113.85796, gpsBearing: 341},{latitude: 22.614135, longitude: 113.857541, gpsBearing: 328},{latitude: 22.615013, longitude: 113.856929, gpsBearing: 326},{latitude: 22.616048, longitude: 113.85613, gpsBearing: 322},{latitude: 22.617079, longitude: 113.855296, gpsBearing: 319},{latitude: 22.61802, longitude: 113.854498, gpsBearing: 321},{latitude: 22.618689, longitude: 113.853904, gpsBearing: 321},{latitude: 22.619046, longitude: 113.85358, gpsBearing: 318},{latitude: 22.619278, longitude: 113.853376, gpsBearing: 316},{latitude: 22.619668, longitude: 113.853046, gpsBearing: 329},{latitude: 22.620248, longitude: 113.852555, gpsBearing: 320},{latitude: 22.62042, longitude: 113.85239, gpsBearing: 321},{latitude: 22.62085, longitude: 113.852022, gpsBearing: 321},{latitude: 22.621188, longitude: 113.851787, gpsBearing: 337},{latitude: 22.62167, longitude: 113.851444, gpsBearing: 326},{latitude: 22.622059, longitude: 113.851191, gpsBearing: 331},{latitude: 22.622527, longitude: 113.850892, gpsBearing: 330},{latitude: 22.622824, longitude: 113.850735, gpsBearing: 340},{latitude: 22.623182, longitude: 113.850531, gpsBearing: 332},{latitude: 22.623666, longitude: 113.850243, gpsBearing: 333},{latitude: 22.624357, longitude: 113.84992, gpsBearing: 337},{latitude: 22.624972, longitude: 113.849677, gpsBearing: 342},{latitude: 22.625648, longitude: 113.849314, gpsBearing: 327},{latitude: 22.626399, longitude: 113.848871, gpsBearing: 332},{latitude: 22.626952, longitude: 113.848533, gpsBearing: 328},{latitude: 22.627567, longitude: 113.848077, gpsBearing: 324},{latitude: 22.628267, longitude: 113.847538, gpsBearing: 325},{latitude: 22.62907, longitude: 113.846803, gpsBearing: 320},{latitude: 22.629844, longitude: 113.846088, gpsBearing: 319},{latitude: 22.630508, longitude: 113.845474, gpsBearing: 320},{latitude: 22.631219, longitude: 113.844839, gpsBearing: 320},{latitude: 22.631904, longitude: 113.844202, gpsBearing: 317},{latitude: 22.6326, longitude: 113.843615, gpsBearing: 323},{latitude: 22.63327, longitude: 113.84305, gpsBearing: 319},{latitude: 22.63395, longitude: 113.84246, gpsBearing: 321},{latitude: 22.634749, longitude: 113.841687, gpsBearing: 314},{latitude: 22.635693, longitude: 113.840785, gpsBearing: 318},{latitude: 22.636531, longitude: 113.839701, gpsBearing: 302},{latitude: 22.637421, longitude: 113.838755, gpsBearing: 320},{latitude: 22.638429, longitude: 113.837917, gpsBearing: 318},{latitude: 22.639228, longitude: 113.837153, gpsBearing: 318},{latitude: 22.639727, longitude: 113.836756, gpsBearing: 325},{latitude: 22.640429, longitude: 113.836294, gpsBearing: 330},{latitude: 22.640876, longitude: 113.836018, gpsBearing: 332},{latitude: 22.641161, longitude: 113.835815, gpsBearing: 324},{latitude: 22.641617, longitude: 113.835526, gpsBearing: 334},{latitude: 22.642177, longitude: 113.835227, gpsBearing: 331},{latitude: 22.642515, longitude: 113.834992, gpsBearing: 320},{latitude: 22.643021, longitude: 113.834658, gpsBearing: 329},{latitude: 22.643557, longitude: 113.834292, gpsBearing: 328},{latitude: 22.644073, longitude: 113.833943, gpsBearing: 327},{latitude: 22.644542, longitude: 113.833564, gpsBearing: 319},{latitude: 22.645273, longitude: 113.832871, gpsBearing: 319},{latitude: 22.64629, longitude: 113.832075, gpsBearing: 321},{latitude: 22.647176, longitude: 113.831203, gpsBearing: 315},{latitude: 22.648153, longitude: 113.830214, gpsBearing: 316},{latitude: 22.64912, longitude: 113.829231, gpsBearing: 316},{latitude: 22.649892, longitude: 113.828469, gpsBearing: 319},{latitude: 22.650929, longitude: 113.827758, gpsBearing: 334},{latitude: 22.652273, longitude: 113.82722, gpsBearing: 346},{latitude: 22.653721, longitude: 113.827043, gpsBearing: 0},{latitude: 22.65517, longitude: 113.827253, gpsBearing: 14},{latitude: 22.656599, longitude: 113.827553, gpsBearing: 11},{latitude: 22.658001, longitude: 113.827843, gpsBearing: 10},{latitude: 22.659265, longitude: 113.828104, gpsBearing: 10},{latitude: 22.660267, longitude: 113.828311, gpsBearing: 11},{latitude: 22.661353, longitude: 113.828523, gpsBearing: 10},{latitude: 22.662587, longitude: 113.828707, gpsBearing: 5},{latitude: 22.663792, longitude: 113.828852, gpsBearing: 9},{latitude: 22.664849, longitude: 113.828935, gpsBearing: 358},{latitude: 22.666112, longitude: 113.828927, gpsBearing: 0},{latitude: 22.66696, longitude: 113.828904, gpsBearing: 0},{latitude: 22.6682, longitude: 113.828904, gpsBearing: 1},{latitude: 22.669147, longitude: 113.828892, gpsBearing: 357},{latitude: 22.670029, longitude: 113.82891, gpsBearing: 1},{latitude: 22.670366, longitude: 113.829053, gpsBearing: 74},{latitude: 22.670421, longitude: 113.829364, gpsBearing: 90},{latitude: 22.670444, longitude: 113.829855, gpsBearing: 93},{latitude: 22.670461, longitude: 113.830243, gpsBearing: 77},{latitude: 22.670541, longitude: 113.830399, gpsBearing: 21},{latitude: 22.670909, longitude: 113.83034, gpsBearing: 349},{latitude: 22.671146, longitude: 113.830415, gpsBearing: 38},{latitude: 22.671149, longitude: 113.830554, gpsBearing: 143},{latitude: 22.671147, longitude: 113.830591, gpsBearing: 103},{latitude: 22.671211, longitude: 113.830701, gpsBearing: 59},{latitude: 22.671229, longitude: 113.830758, gpsBearing: 54},{latitude: 22.671152, longitude: 113.830826, gpsBearing: 141},{latitude: 22.671181, longitude: 113.830789, gpsBearing: 148},{latitude: 22.671081, longitude: 113.830807, gpsBearing: 173},{latitude: 22.671056, longitude: 113.830823, gpsBearing: 176},{latitude: 22.671067, longitude: 113.830761, gpsBearing: 197},{latitude: 22.671138, longitude: 113.830843, gpsBearing: 199},{latitude: 22.67108, longitude: 113.830825, gpsBearing: 204},{latitude: 22.671102, longitude: 113.830873, gpsBearing: 210},{latitude: 22.671024, longitude: 113.830966, gpsBearing: 200},{latitude: 22.670681, longitude: 113.830952, gpsBearing: 146},{latitude: 22.670178, longitude: 113.830837, gpsBearing: 182},{latitude: 22.671683, longitude: 113.830848, gpsBearing: 63},{latitude: 22.671662, longitude: 113.830848, gpsBearing: 63},{latitude: 22.671662, longitude: 113.830841, gpsBearing: 55},{latitude: 22.671555, longitude: 113.83088, gpsBearing: 20},{latitude: 22.671481, longitude: 113.830897, gpsBearing: 11},{latitude: 22.671486, longitude: 113.830877, gpsBearing: 11},{latitude: 22.671422, longitude: 113.830844, gpsBearing: 11},{latitude: 22.6714, longitude: 113.830852, gpsBearing: 11},{latitude: 22.671388, longitude: 113.830872, gpsBearing: 11},{latitude: 22.671458, longitude: 113.830874, gpsBearing: 11},{latitude: 22.671463, longitude: 113.830894, gpsBearing: 11},{latitude: 22.671475, longitude: 113.830892, gpsBearing: 11},{latitude: 22.671493, longitude: 113.830812, gpsBearing: 11},{latitude: 22.67146, longitude: 113.830784, gpsBearing: 11},{latitude: 22.671443, longitude: 113.830807, gpsBearing: 11},{latitude: 22.671389, longitude: 113.830789, gpsBearing: 11},{latitude: 22.671289, longitude: 113.830735, gpsBearing: 11},{latitude: 22.671227, longitude: 113.830663, gpsBearing: 11},{latitude: 22.671224, longitude: 113.830673, gpsBearing: 11},{latitude: 22.671251, longitude: 113.830766, gpsBearing: 11},{latitude: 22.671234, longitude: 113.830775, gpsBearing: 11},{latitude: 22.67121, longitude: 113.830679, gpsBearing: 11},{latitude: 22.67117, longitude: 113.83051, gpsBearing: 11},{latitude: 22.671142, longitude: 113.830573, gpsBearing: 11},{latitude: 22.670879, longitude: 113.830429, gpsBearing: 348},{latitude: 22.670907, longitude: 113.830445, gpsBearing: 260},{latitude: 22.670978, longitude: 113.830479, gpsBearing: 224},{latitude: 22.671004, longitude: 113.830568, gpsBearing: 224},{latitude: 22.670994, longitude: 113.830727, gpsBearing: 153},{latitude: 22.670997, longitude: 113.830757, gpsBearing: 161},{latitude: 22.671047, longitude: 113.830795, gpsBearing: 166},{latitude: 22.671073, longitude: 113.830817, gpsBearing: 169},{latitude: 22.671085, longitude: 113.830824, gpsBearing: 169},{latitude: 22.671058, longitude: 113.830814, gpsBearing: 169},{latitude: 22.671086, longitude: 113.830899, gpsBearing: 169},{latitude: 22.671089, longitude: 113.830965, gpsBearing: 169},{latitude: 22.671117, longitude: 113.830947, gpsBearing: 169},{latitude: 22.671631, longitude: 113.831154, gpsBearing: 158},{latitude: 22.6716, longitude: 113.831148, gpsBearing: 145},{latitude: 22.67152, longitude: 113.831287, gpsBearing: 145},{latitude: 22.671486, longitude: 113.831509, gpsBearing: 77},{latitude: 22.67135, longitude: 113.831558, gpsBearing: 96},{latitude: 22.671349, longitude: 113.831529, gpsBearing: 102},{latitude: 22.671346, longitude: 113.831489, gpsBearing: 95},{latitude: 22.671388, longitude: 113.831372, gpsBearing: 95},{latitude: 22.671386, longitude: 113.831333, gpsBearing: 95},{latitude: 22.671407, longitude: 113.831286, gpsBearing: 95},{latitude: 22.671292, longitude: 113.831228, gpsBearing: 95},{latitude: 22.671025, longitude: 113.831196, gpsBearing: 149},{latitude: 22.671026, longitude: 113.831183, gpsBearing: 180},{latitude: 22.671076, longitude: 113.83113, gpsBearing: 180},{latitude: 22.671119, longitude: 113.831024, gpsBearing: 180},{latitude: 22.67117, longitude: 113.830974, gpsBearing: 180},{latitude: 22.67112, longitude: 113.830935, gpsBearing: 180},{latitude: 22.671233, longitude: 113.830912, gpsBearing: 180},{latitude: 22.671269, longitude: 113.830879, gpsBearing: 180},{latitude: 22.671215, longitude: 113.830906, gpsBearing: 180},{latitude: 22.6712, longitude: 113.830907, gpsBearing: 180},{latitude: 22.671278, longitude: 113.830979, gpsBearing: 180},{latitude: 22.671498, longitude: 113.831101, gpsBearing: 180},{latitude: 22.671705, longitude: 113.831304, gpsBearing: 43},{latitude: 22.671713, longitude: 113.831276, gpsBearing: 297},{latitude: 22.67165, longitude: 113.831221, gpsBearing: 298},{latitude: 22.671617, longitude: 113.83117, gpsBearing: 312},{latitude: 22.671463, longitude: 113.831156, gpsBearing: 326},{latitude: 22.671413, longitude: 113.831106, gpsBearing: 339},{latitude: 22.671225, longitude: 113.831049, gpsBearing: 353},{latitude: 22.670929, longitude: 113.830936, gpsBearing: 99},{latitude: 22.670841, longitude: 113.83088, gpsBearing: 225},{latitude: 22.671066, longitude: 113.830904, gpsBearing: 231},{latitude: 22.671164, longitude: 113.830972, gpsBearing: 20},{latitude: 22.671189, longitude: 113.83107, gpsBearing: 22},{latitude: 22.671145, longitude: 113.831111, gpsBearing: 29},{latitude: 22.671133, longitude: 113.830951, gpsBearing: 34},{latitude: 22.671185, longitude: 113.830818, gpsBearing: 29},{latitude: 22.671209, longitude: 113.830802, gpsBearing: 348},{latitude: 22.671145, longitude: 113.830834, gpsBearing: 348},{latitude: 22.67109, longitude: 113.830825, gpsBearing: 348},{latitude: 22.671034, longitude: 113.830765, gpsBearing: 348},{latitude: 22.671065, longitude: 113.830838, gpsBearing: 348},{latitude: 22.671175, longitude: 113.830935, gpsBearing: 348},{latitude: 22.671178, longitude: 113.830935, gpsBearing: 348},{latitude: 22.671248, longitude: 113.830893, gpsBearing: 348},{latitude: 22.671134, longitude: 113.83089, gpsBearing: 348},{latitude: 22.671147, longitude: 113.830964, gpsBearing: 348},{latitude: 22.671283, longitude: 113.831064, gpsBearing: 348},{latitude: 22.671341, longitude: 113.831058, gpsBearing: 348}],
      color: "#7b7af8",
      width: 5,
      //borderWidth: 2,
      borderColor: '#7b7af8',
      level: 'abovebuildings',      //压盖关系
      arrowLine: true               //带箭头的线
    }],
    polygons: [],
    mapSettings: {               //统一设置地图配置
      skew: 0,                  //倾斜角度
      rotate: 0,                //旋转角度
      showScale: false,         //显示比例尺，工具暂不支持
      subKey: '',               //个性化地图使用的key
      layerStyle: 1,            //个性化地图配置的 style
      enableZoom: true,         //缩放
      enableScroll: true,       //拖动
      enableRotate: false,      //旋转
      showCompass: false,         //指南针
      enable3D: false,            //展示3D楼块(工具暂不支持）
      enableOverlooking: false,   //俯视
      enableSatellite: false,     //卫星图
      enableTraffic: false,       //实时路况
    },
    playIndex: 0,
    showMessage: "",
    step: 1,
    duration: 100,
    maxDuration: 2000,
    minDuration: 500,
    isPause: false
  },
  trackPlay: function () { //轨迹接口
    const that = this;
    const points = this.data.polylineSettings[0].points;
    that.setData({
      'markers[0].latitude': points[0].latitude,
      'markers[0].longitude': points[0].longitude,
      mapCenter: points[0],
    }, function () {
      that.mapCtx.translateMarker({
        markerId: 1,
        autoRotate: true,
        moveWithRotate: true,
        duration: 1000,
        destination: points[0]
      })
      that.beginTrack() //轨迹回放
    })
  },
  beginTrack: function () { //轨迹回放
    const that = this;
    let index = that.data.playIndex === 0 ? 0 : that.data.playIndex;
    let points = this.data.polylineSettings[0].points;
    let duration = that.data.duration;
 
    //this.play();
    that.data.trackTimer = setInterval(function () {
      const point = points[index];
      that.data.lastPoint = point;
      //console.log("最后点:",that.data.lastPoint);
      // console.log(point,that.getCurrentTime());
      that.mapCtx.translateMarker({
        markerId: 1,
        autoRotate: false,
        moveWithRotate: true,
        duration: duration,
        destination: point,
        rotate: point.gpsBearing,
        fail: function (res) {
          console.log(res);
        },
        success: function () {
          that.setData({
            playIndex: index,
            showMessage: point.latitude + "," + point.longitude + "," + point.gpsBearing + "," + points.length + "," + index
          })
          that.mapCtx.getRegion({
            success: function (e) {
              if (that.checkOutRegion(point, e.southwest, e.northeast)) {
                that.setData({
                  mapCenter: point,
                })
              }
            }
          });
          if (index + 1 >= points.length) {
            that.stopTrack()
          }
          index++;
        }
      })
 
    }, duration);
  },
  stopTrack: function () { //结束回放
    const that = this;
    let points = this.data.polylineSettings[0].points;
    that.setData({
      playIndex: 0,
      'markers[0].latitude': points[0].latitude,
      'markers[0].longitude': points[0].longitude,
    });
    clearInterval(that.data.trackTimer);
  },
  checkOutRegion: function (point, southwest, northeast) {
    // console.log(point,southwest,northeast);
    if (point.longitude < southwest.longitude || point.latitude < southwest.latitude) {
      return true;
    }
    if (point.longitude > northeast.longitude || point.latitude > northeast.latitude) {
      return true;
    }
    return false;
  },
  trackerPause: function () {
    if (!this.data.isPause) {
      clearInterval(this.data.trackTimer);
      this.setData({
        isPause: true
      });
    }
 
  },
  trackerPlay: function () {
    if (this.data.isPause) {
      this.beginTrack();
      this.setData({
        isPause: false
      });
    }
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('mymap');
    this.trackPlay();
  },
})