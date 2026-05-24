#!/bin/bash
set -eu -o pipefail

# Check if env variable BASIC_TOKEN is defined
if [ -z "${BASIC_TOKEN}" ]; then
    echo "BASIC_TOKEN is not defined. Stopping script."
    exit 1
fi

FILEPATHS=(
    "/opt/amaral-sofware/portal/assets/bff.config.json"
)

# Loop through each file path and run the sed command
for FILEPATH in "${FILEPATHS[@]}"; do
    sed -i 's|\("paths": \["\)/|\1/|' "$FILEPATH"
    sed -i "s/.*bff.auth.pass.*/\"bff.auth.pass\":\"${BASIC_TOKEN}\"/g" "$FILEPATH"
done
