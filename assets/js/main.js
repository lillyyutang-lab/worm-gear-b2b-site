const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.menu');
if(toggle&&menu){toggle.addEventListener('click',()=>menu.classList.toggle('open'));}

const whatsappGreeting="Hello SMK, I’m interested in your gearboxes and electric motors. Could you please recommend a suitable model and provide a quotation? Let’s discuss my requirements.";

document.querySelectorAll('a[href*="wa.me/"]').forEach((link)=>{
  const whatsappUrl=new URL(link.href);
  whatsappUrl.searchParams.set('text',whatsappGreeting);
  link.href=whatsappUrl.toString();
});
