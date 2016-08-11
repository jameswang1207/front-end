#解决Ubuntu下Sublime Text 3无法输入中文
http://www.jianshu.com/p/bf05fb3a4709

#Linux公社资源站下载http://linux.linuxidc.com/
username  an password : www.linuxidc.com

#Nginx config
```sh
server {
    listen      7775;
    server_name localhost;
    root  /usr/share/nginx/html/front-end/;
    index index.html index.htm index.php;

    access_log /var/log/nginx/frontend-access.log;
    error_log  /var/log/nginx/frontend-error.log;

    location /api {
        try_files $uri $uri/ /index.php?$args;
    }

    location /webapp {
        alias /usr/share/nginx/html/front-end/webapp;
    }

    location /vue {
        alias /usr/share/nginx/html/front-end/vue-hackernews;
    }

    location ~ .*\.(php|php5)?$ {
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        # or fastcgi_pass   127.0.0.1:9000;
        include        fastcgi_params;
    }

    location ~ /\.(ht|svn|git) {
            deny all;
    }
}
```
