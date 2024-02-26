# Git Cheat Sheet
Always `git pull` on master before you start editing if you plan on pushing very soon

#### Creating branches
`git checkout -b gs/12-NAME`

#### Commiting branches
`git add . && git commit -m "YOUR MESSAGE" && git push`

#### Many commits behind. Delete whatever I have and Fetch me the latest head
`git reset --hard && git fetch main`