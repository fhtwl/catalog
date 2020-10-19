#打开git base，执行
#sh deploy.sh


# 保存所有的修改
echo "执行命令：git add -A"
git add -A

# 把修改的文件提交
echo "执行命令：commit -m 'deploy'"
git commit -m 'commit'

# git push -f https://github.com/fhtwl/catalog.git master
git push -f https://github.com/fhtwl/catalog.git master