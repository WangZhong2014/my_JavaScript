用windows安装nvm和node的流程，以及遇到的一些坑.md
---

安装node.js有2种方法。
第一种是直接通过node.js的官网来下载.exe安装，但这种方法的弊端是，每次更新都要去下载一次，而且安装时会覆盖掉旧的版本，也即电脑里面只能保留1个node.js的版本。

所以，通常是通过nvm来进行node.js的下载的，先去下载nvm，通过nvm安装node.js，用nvm进行版本控制，这样的好处是可以下载多个版本的node.js。

* 下载nvm,运行setup.exe
先设置安装nvm的本地文件夹。
再设置安装node的文件夹路径。
（不要乱设，以防之后找不到文件夹的路径）
安装成功后，退出。
> 这里，不是打开nvm.exe来进行安装node的，是通过cmd命令行的方式来进行安装node.js。

* 打开cmd（命令提示符）进入。
先检测是否安装成功了nvm.
``` nvm -v```
![](http://othyo5zr8.bkt.clouddn.com/17-8-10/24130605.jpg)
出现版本号，即nvm安装成功了。如果没有，则需要执行安装nvm。

* 下一步就是安装node.js

你可以先测试下，你的windows系统的位数。
输入``` nvm arch```
![](http://othyo5zr8.bkt.clouddn.com/17-8-10/68084187.jpg)
我的电脑是64位的。
s
那么就可以安装64位的，直接输入```nvm install latest```。
> 如果你的系统位数是32位的，则在后面要添加上```nvm install latest 32```