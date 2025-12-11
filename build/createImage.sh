#!/bin/bash
set -x

VERSION=2.1.0
APPLICATION_NAME=central-hub
PUSH=false

MODULES=();
MODULES+=("../src/backend/Dockerfile-backend");
MODULES+=("../src/frontend/Dockerfile-frontend");

#print_usage
print_usage() {
    echo "options are:"
    echo "-p to push images default false"
    echo "-m modules separated by comma default are ${ALL_MODULES[@]}"
}

while getopts 'pm:e:h' flag; do
  case "${flag}" in
    p) PUSH='true' ;;
    m) MODULES=(${OPTARG}) ;;
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
      docker tag ${APPLICATION_NAME}-${MODULE}:${VERSION} 192.168.1.222:5000/${APPLICATION_NAME}-${MODULE}:${VERSION}
      docker push 192.168.1.222:5000/${APPLICATION_NAME}-${MODULE}:${VERSION}
    fi

    docker image prune -f

    end=$(date +%s)
    echo "$IMAGE_NAME took: $( echo "$end - $start" | bc -l )s"
}

for ITEM in "${MODULES[@]}"; do
    echo "creating $ITEM";
    create_image $ITEM
done


