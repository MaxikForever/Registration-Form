const steps = document.querySelectorAll(".steps");
const circleSteps = document.querySelectorAll(".step__circle");
const formInputs = document.querySelectorAll(".step-1 form input")
const plans = document.querySelectorAll(".step-2__plan-card");
const switcher = document.querySelector(".switch");
const addons = document.querySelectorAll(".step-3__box");
const total = document.querySelector(".step-4__selection-box__total b");
const planPrice = document.querySelector(".step-4__plan-price");

console.log(`Plan price ${planPrice.innerText}`)

let time; 
let currentStep = 1;
let currentCircle = 0;
const obj = {
  plan: null,
  kind: null,
  price: null,
};




function summary(obj) {
  const planName = document.querySelector(".step-4__plan-name");
  const planPrice = document.querySelector(".step-4__plan-price")
  console.log(`obj . price = ${obj.price}`)
  planPrice.innerHTML = `${obj.price.innerText}`;
  planName.innerHTML = `${obj.plan.innerText} (${obj.kind ? "yearly" : "monthly"})`;
}


function validateForm() {
  let valid = true;
  for (let i = 0; i < formInputs.length; i++) {
  
    if (!formInputs[i].value) {
      valid = false;
      formInputs[i].classList.add("error");
      console.log(` find label result : ${findLabel(formInputs[i]).nextElementSibling.style.display}`)
      findLabel(formInputs[i]).nextElementSibling.style.display = "flex";
    } else {
      valid = true;
      formInputs[i].classList.remove("error");
     
      findLabel(formInputs[i]).nextElementSibling.style.display = "none";
    }
  }
  return valid;
}

function findLabel(el) {
  const idVal = el.id;
  const labels = document.getElementsByTagName("label");

  for (let i = 0; i < labels.length; i++) {
    if(labels[i].htmlFor == idVal) return labels[i];
    
  }
}




steps.forEach( step => { 
  const nextBtn = document.querySelector(".steps__next-step");
  const prevBtn = document.querySelector(".steps__prev-step");

  if(prevBtn) {
    prevBtn.addEventListener("click", () => {
      document.querySelector(`.step-${currentStep}`).style.display = "none";
      currentStep--;
      document.querySelector(`.step-${currentStep}`).style.display = "flex"
      circleSteps[currentCircle].remove("active")
      currentCircle--;

    })
  }

  nextBtn.addEventListener("click", () => {
    document.querySelector(`.step-${currentStep}`).style.display = "none"
    if (currentStep < 5 && validateForm() ) {
      currentStep++;
      currentCircle++;
      setTotal();
    }
    document.querySelector(`.step-${currentStep}`).style.display= "flex";
    console.log(` circle steps ${circleSteps[currentCircle].classList}`)
    circleSteps[currentCircle].classList.add("active");
    obj.price = planPrice.innerHTML;
    summary(obj)
  })

})

