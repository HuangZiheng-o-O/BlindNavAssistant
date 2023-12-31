#!/bin/bash
CARTOGRAPHER_HOME=$1

if [ "$PIBOT_HOME" == "" ]; then
    echo "PIBOT_HOME not defined, please exec pibot_init_env"
    exit
fi

if [ "$CARTOGRAPHER_HOME" == "" ]; then
    CARTOGRAPHER_HOME=$HOME/cartographer
else
    CARTOGRAPHER_HOME=$CARTOGRAPHER_HOME/cartographer
fi

echo "CARTOGRAPHER_HOME:" $CARTOGRAPHER_HOME
mkdir -p $CARTOGRAPHER_HOME

if [[ "$(lsb_release -sc)" = "focal" || "$(lsb_release -sc)" = "buster" ]]
then
    sudo apt-get install -y google-mock \
                libcairo2-dev \
                libgoogle-glog-dev \
                liblua5.2-dev \
                ninja-build \
                stow \
                libgmock-dev
else
    echo "cartograper had installed in $(lsb_release -sc)"
    exit
fi

echo "# **************************************abseil-cpp*********************************************#"
cd $CARTOGRAPHER_HOME
rm -rf abseil-cpp
if [ -f $PIBOT_HOME/ros_package/abseil-cpp.tar.gz ]; then
    tar xzf $PIBOT_HOME/ros_package/abseil-cpp.tar.gz
    cd abseil-cpp
else
    git clone https://github.com/abseil/abseil-cpp.git
    cd abseil-cpp
    git checkout d902eb869bcfacc1bad14933ed9af4bed006d481
fi
mkdir build
cd build
cmake -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
  -DCMAKE_INSTALL_PREFIX=/usr/local/stow/absl \
  ..
ninja
sudo ninja install
cd /usr/local/stow
sudo stow absl

echo "# **************************************ceres-solver*********************************************#"
cd $CARTOGRAPHER_HOME
rm -rf ceres-solver
if [ -f $PIBOT_HOME/ros_package/ceres-solver.tar.gz ]; then
    tar xzf $PIBOT_HOME/ros_package/ceres-solver.tar.gz
    cd ceres-solver
else
    VERSION="1.13.0"
    git clone https://ceres-solver.googlesource.com/ceres-solver
    cd ceres-solver
    git checkout tags/${VERSION}
fi
mkdir build
cd build
cmake .. -G Ninja -DCXX11=ON
ninja
# CTEST_OUTPUT_ON_FAILURE=1 ninja test
sudo ninja install

echo "# **************************************protobuf*********************************************#"
cd $CARTOGRAPHER_HOME
rm -rf protobuf
if [ -f $PIBOT_HOME/ros_package/protobuf.tar.gz ]; then
    tar xzf $PIBOT_HOME/ros_package/protobuf.tar.gz
    cd protobuf
else
    VERSION="v3.4.1"
    # Build and install proto3.
    git clone https://github.com/google/protobuf.git
    cd protobuf
    git checkout tags/${VERSION}
fi

mkdir build
cd build
cmake -G Ninja \
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
  -DCMAKE_BUILD_TYPE=Release \
  -Dprotobuf_BUILD_TESTS=OFF \
  ../cmake
ninja
sudo ninja install


echo "# **************************************cartographer*********************************************#"
cd $CARTOGRAPHER_HOME
rm -rf cartographer
if [ -f $PIBOT_HOME/ros_package/cartographer.tar.gz ]; then
    tar xzf $PIBOT_HOME/ros_package/cartographer.tar.gz
    cd cartographer
else
    VERSION="2.0.0"
    git clone https://github.com/cartographer-project/cartographer.git
    # Build and install Cartographer.
    cd cartographer
    git checkout tags/${VERSION}
fi
mkdir build
cd build
cmake .. -G Ninja
ninja
# CTEST_OUTPUT_ON_FAILURE=1 ninja test
sudo ninja install

echo "# **************************************cartographer_ros*********************************************#"
cd $CARTOGRAPHER_HOME
rm -rf cartographer_ros
if [ -f $PIBOT_HOME/ros_package/cartographer_ros.tar.gz ]; then
    tar xzf $PIBOT_HOME/ros_package/cartographer_ros.tar.gz
    cd cartographer_ros
else
    VERSION="1.0.0"
    git clone https://github.com/cartographer-project/cartographer_ros.git
    cd cartographer_ros
    git checkout tags/${VERSION}
fi
ln -sf $CARTOGRAPHER_HOME/cartographer_ros $PIBOT_HOME/ros_package