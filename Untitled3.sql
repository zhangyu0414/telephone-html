DROP DATABASE IF EXISTS msgsystem;    /*由于此句的存在，此脚本不能在产品环境下轻易多次执行*/
/*创建数据库，指定其中所有数据的默认编码方式*/
CREATE DATABASE msgsystem CHARSET=UTF8;
/*使用指定的数据库*/
USE msgsystem;
/*****创建保存留言信息的表*****/
CREATE TABLE msg_board(
    mno INT AUTO_INCREMENT,    /*自增列：插入时若不指定值，则下一个值为当前最大值+1*/
    username VARCHAR(32),
    phone VARCHAR(32),
    qq VARCHAR(32),
    pubtime DATETIME,
    content VARCHAR(4096),
    PRIMARY KEY(mno)
);
INSERT INTO msg_board(username,phone,qq,pubtime,content)
VALUES('李建国','13907896457','65872361','2014-12-10 09:10:25','请问贵公司产品有宣传页吗？');
INSERT INTO msg_board(username,phone,qq,pubtime,content)
VALUES('ASDF','--','78298771443','2014-12-15 11:16:01','发_漂，办—征，见扣扣');
INSERT INTO msg_board(username,phone,qq,pubtime,content)
VALUES('Kingston','13301234567','--','2014-12-22 17:07:08','金士顿特许代理商直供，保真先验后用');
INSERT INTO msg_board(username,phone,qq,pubtime,content)
VALUES('王安石','15078765125','611198431','2014-12-28 20:04:11','请问贵公司招聘前端开发工程师吗？');
SELECT * FROM msg_board;