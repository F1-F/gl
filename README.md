# GLaDOS 每日签到

* #### 每天早上9点30分自动签到
* #### 可用server酱通过公众号推送结果

## 使用说明

### 一、Fork此仓库

![fork](imgs/fork.jpg)

### 二、设置密钥
* #### SCKEY serve酱的sckey（不需要可以不创建或不设置）

* #### COOKIE 账号的cookie

![secrets](imgs/secrets.png)

### 三、启用Action
#### 1. 点击Actions，再点击I understand my workflows, go ahead and enable them

![enableAction](imgs/enableAction.png)

#### 2. 点击仓库右上角的Star或修改除imgs文件夹和README.md以外的内容并进行Push

![star](imgs/star.jpg)

### 四、查看运行结果

![runResult](imgs/runResult.png)

![server](imgs/server.jpg)

## 修改定时
#### 1. 打开.github/workflows/checkin.yml
#### 2. 修改crontab表达式
![modifySchedule](imgs/modifySchedule.png)

