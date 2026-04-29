#!/bin/bash
set -x

VERSION=0.0.0
APPLICATION_NAME=central-hub
PUSH=false
DOCKER_REGISTRY=192.168.1.222

MODULES=();
MODULES+=("../src/backend/Dockerfile-backend");
MODULES+=("../src/frontend/Dockerfile-frontend");

print_usage() {
    echo "Options are:"
    echo "-p                Push images, default false"
    echo "-t <tag>          Image tag/version, default ${VERSION}"
    echo "-r <docker registry> Docker registry url"
    echo "-m <modules>      Modules separated by space, quoted as one argument"
    echo "                  Example: -m \"../src/backend/Dockerfile-backend ../src/frontend/Dockerfile-frontend\""
    echo "-h                Show help"
}

while getopts ':pt:m::r:h' flag; do
  case "${flag}" in
    p) PUSH='true' ;;
    m) MODULES=(${OPTARG}) ;;
    t) VERSION="${OPTARG}" ;;
    r) DOCKER_REGISTRY="${OPTARG}" ;;
    h) print_usage
        exit 1 ;;
    *) print_usage
       exit 1 ;;
  esac
done

create_image() {
    start=$(date +%s)

    DIR=`echo $1 |sed  "s/\/Dockerfile-.*//"`
    MODULE=`echo $1 |sed  "s/.*\/Dockerfile-//"`
    IMAGE_NAME=${MODULE}

    if [[ ! -z $DIR ]]; then
      echo $PWD
      cd $DIR
    fi

    docker build \
      -f Dockerfile-$MODULE \
      -t ${APPLICATION_NAME}-${MODULE}:${VERSION} \
      .

    if [[ ! -z $DIR ]]; then
      cd -
    fi

    if [ $PUSH = "true" ]; then
      docker tag ${APPLICATION_NAME}-${MODULE}:${VERSION} ${DOCKER_REGISTRY}:5000/${APPLICATION_NAME}-${MODULE}:${VERSION}
      docker push ${DOCKER_REGISTRY}:5000/${APPLICATION_NAME}-${MODULE}:${VERSION}
    fi

    docker image prune -f

    end=$(date +%s)
    echo "$IMAGE_NAME took: $( echo "$end - $start" | bc -l )s"
}

for ITEM in "${MODULES[@]}"; do
    echo "creating $ITEM";
    create_image $ITEM
done


