function setBrowserIcon(url){
    let link = document.querySelector('link[rel*="icon"]') || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url; //'./images/icon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}