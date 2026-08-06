const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.menu');
if(toggle&&menu){toggle.addEventListener('click',()=>menu.classList.toggle('open'));}

const whatsappNumber='8615262579178';
const whatsappGreeting="Hello SMK, I’m interested in your gearboxes and electric motors. Could you please recommend a suitable model and provide a quotation? Let’s discuss my requirements.";

function addFloatingAction(className,imageSrc,imageAlt,ariaLabel){
  if(document.querySelector('.'+className)){return;}
  const link=document.createElement('a');
  link.className=className;
  link.href='https://wa.me/'+whatsappNumber;
  link.target='_blank';
  link.rel='noopener noreferrer';
  link.setAttribute('aria-label',ariaLabel);

  const image=document.createElement('img');
  image.src=imageSrc;
  image.alt=imageAlt;
  image.loading='lazy';
  link.appendChild(image);
  document.body.appendChild(link);
}

addFloatingAction('whatsapp-float','assets/images/whatsapp-float.webp','Contact SMK on WhatsApp','Contact SMK on WhatsApp');
addFloatingAction('quote-float','assets/images/quote-float.webp','Get a free quote from SMK','Get a free quote from SMK');

document.querySelectorAll('a[href*="wa.me/"]').forEach((link)=>{
  const whatsappUrl=new URL(link.href);
  whatsappUrl.searchParams.set('text',whatsappGreeting);
  link.href=whatsappUrl.toString();
});
