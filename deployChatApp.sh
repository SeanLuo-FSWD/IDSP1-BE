echo "DEPLOYMENT STARTED";
if [ -d "../idsp2-chat" ] 
then
    rm -r ../idsp2-chat;
    cd ..;
    git clone git@github.com:kjohnathan/idsp2-chat.git;
    cd idsp2-chat;
    npm install;
    npm run build;

    if [ -d "../idsp2/public" ]
    then 
        rm -r ../idsp2/public;
        mkdir ../idsp2/public;
        mv ./build/* ../idsp2/public;
    else 
        mkdir ../idsp2/public;
        mv ./build/* ../idsp2/public;
    fi 
else 
    cd ..
    git clone git@github.com:kjohnathan/idsp2-chat.git;
    cd idsp2-chat;
    npm install;
    npm run build;


    if [ -d "../idsp2/public" ]
    then 
        rm -r ../idsp2/public;
        mkdir ../idsp2/public;
        mv ./build/* ../idsp2/public;
    else 
        mkdir ../idsp2/public;
        mv ./build/* ../idsp2/public;
    fi 
fi