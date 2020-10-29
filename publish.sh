#!/bin/bash -e
if [ -n "$(git status --porcelain)" ]; then
    echo "有未提交的修改"
    exit 0
fi
commits=`git log $(git describe --tags --abbrev=0)..HEAD --oneline`
echo "$commits"
if [ -z "$commits" ];then
    echo "上个tag之后没有任何提交！"
    exit 0
fi
npm run build
git add -A && git commit -m "build"
git push
npm version patch
git push --tags
echo "请等待github actions完成"
