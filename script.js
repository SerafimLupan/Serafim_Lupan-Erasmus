const bootContainer=document.getElementById('boot-sequence');
const mainContent=document.getElementById('main-content');
const streamSections=document.querySelectorAll('.stream-section');

const bootLogs=[
    {text:"root@serafimlupan.com:~# chmod +x ./serafimlupan.sh && ./serafimlupan.sh",delay:180,isPrompt:true},
    {text:"[+] Initializing environment...",delay:60},
    {text:"Reading package lists... Done",delay:50},
    {text:"Building dependency tree... Done",delay:50},
    {text:"Reading state information... Done",delay:50},
    {text:"Get:1 https://serafimlupan.com/repo rolling/main amd64 Packages [1,024 B]",delay:80},
    {text:"Unpacking portfolio-core (2.4.0-1) ...",delay:100},
    {text:"Setting up environment modules...", delay:60},
    {text:"[████████████████████████████████████████] 100% Executing script...",delay:120},
    {text:"[+] Executing interactive portfolio script...",delay:80}
];

async function runBashScriptExecution(){
    if(!bootContainer||!mainContent)return;

    for(const log of bootLogs){
        const line=document.createElement('div');
        line.style.color=log.isPrompt?"#4ade80":"rgba(0, 255, 0, 0.7)";
        if(log.isPrompt)line.style.fontWeight="bold";
        bootContainer.appendChild(line);

        for(let i=0;i<log.text.length;i++){
            line.textContent+=log.text.charAt(i);
            await new Promise(r=>setTimeout(r,5));
        }

        await new Promise(r=>setTimeout(r,log.delay));
    }

    mainContent.classList.remove('hidden');

    for (let i=0;i<streamSections.length;i++) {
        const sec=streamSections[i];
        sec.classList.remove('hidden');
        sec.classList.add('bash-stdout');
        await new Promise(r=>setTimeout(r,100));
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    runBashScriptExecution();
});



const menuToggle=document.getElementById('menu-toggle');
const mobileMenu=document.getElementById('mobile-menu');
const menuIcon=document.getElementById('menu-icon');
const mobileLinks=document.querySelectorAll('.mobile-link');

if(menuToggle&&mobileMenu){
    menuToggle.addEventListener(
        'click',()=>{
            mobileMenu.classList.toggle('hidden');
            menuIcon.innerText=mobileMenu.classList.contains('hidden')?"[ + ] MENU":"[ - ] CLOSE";
        }
    );

    mobileLinks.forEach(
        link=>{
            link.addEventListener(
                'click',()=>{
                    mobileMenu.classList.add('hidden');
                    menuIcon.innerText="[ + ] MENU";
                }
            );
        }
    );
}



const canvas=document.getElementById('matrix-canvas');

if(canvas){
    const ctx=canvas.getContext('2d');

    const resizeCanvas=()=>{
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
    };

    resizeCanvas();

    const chars='0123456789ABCDEFHIJKLMNOPQRSTUVWXYZ@#$%^&*';
    const fontSize=14;
    let columns=Math.floor(canvas.width/fontSize);
    let drops=Array(columns).fill(1);

    const drawMatrix=()=>{
        if(!ctx)return;

        ctx.fillStyle='rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle='#00ff00';
        ctx.font=`${fontSize}px monospace`;

        for(let i=0;i<drops.length;i++){
            const text=chars.charAt(Math.floor(Math.random()*chars.length));
            ctx.fillText(text,i*fontSize,drops[i]*fontSize);

            if(drops[i]*fontSize>canvas.height&&Math.random()>0.975){drops[i]=0;}
            drops[i]++;
        }
    };

    setInterval(drawMatrix,33);

    window.addEventListener(
        'resize',()=>{
            resizeCanvas();
            columns=Math.floor(canvas.width/fontSize);
            drops=Array(columns).fill(1);
        }
    );
}