// var myText = "Hello, world!";
// document.getElementById('mole');
// document.getElementById('catter');
// document.getElementById('butterfly');
// sentence = "Hi " + userName + ", do you remember the time you were in your 20s?";

let userName = "";
showText = false;

  document.addEventListener('DOMContentLoaded', function() {
  inputName = document.getElementById('name_input');
  button = document.getElementById('button');
  coverForm =  document.getElementById('popupform_container');
  textIntro =  document.getElementById('textIntro');
  pressIntro =  document.getElementById('pressIntro');

  button.addEventListener('click', function() {
      userName = inputName.value;
      button.style.backgroundColor = "green";
      if (userName !== "") {
          showText = true;  

          coverForm.classList.add('hidden');  
          textIntro.classList.add('show'); 
          pressIntro.classList.add('show'); 

          playMusic();   // the preload loadSound in sketch js 
            updateText();

      }
  });
});



const IntroPhrases = [
    "press Space to read",
    "Hi {userName}, welcome to The Resonance of Time.",
    "Let yourself dive into the journey's story.",
    "The goal is to reflect a person's life meaning.",
    "In life, there are three pivotal stages—each filled with its own meaning, challenges, and beauty. ",
    "We'll explore your 20s, 40s, and 60s",
    "the milestones that carry the essence of your past, present, and future.",
    "Now, with an open heart and mind, PRESS 1... and step into the rhythm of your first chapter ",
];

const stage1Phrases = [
    "In the first 20 years of your journey, what stirs your deepest nostalgia?...",
    "Maybe it's the simple joy of sharing crab-flavored snacks with friends",
    "or the free time spent drawing, letting your imagination flow without limits or sadness.",
    "For someoneone, it was the late-night study sessions, aiming for every point on that test sheet,",
    "...even if they missed perfection by just one.",
    "Do you remember the wall, covered with notes and reminders?",
    "Those little scraps of paper pushed you forward, even when you felt lost, didn’t they?",
    "But the deepest nostalgia must be the taste of family meals, right?",
    "where your mom’s thịt kho hột vịt filled your stomachs,",
    "crispy spring rolls dipped in simple canh rau",
    "Childhood is made of these small, precious moments",
    "—each one like a piece of a puzzle that shaped who you are.",
];

const stage2Phrases = [
    "Have you ever heard about 'The four burners theory'",
    "Life, they say, is like a stove with four burners: family, friends, health, and work.",
    "The orange flame symbolizes FAMILY – warm, ever-present, and full of love.",
    "The pink flame burns for FRIENDSHIP – a bright, comforting fire connected to the ones who share your journey.",
    "The green flame represents HEALTH – the vital energy that fuels everything else.",
    "Finally, the blue flame signifies WORK – a flame that burns with ambition and drive.",
    "But here’s the hard truth: as you chase success, you're asked to dim one. Maybe even turn it off.",
    "And some say, to reach great success, two must fade, which would you choose?",
    "you can click the flame you want to remove, but could you?",
    "Is these choices tough?", 
    "In your 40s, this balance is no longer a theory—it becomes reality.", 
    "It's not about keeping every flame bright, but learning which to nurture and which to let rest.",
];

const stage3Phrases = [
    "There are 8 pieces of this puzzle. Can you collect them for me?",
    "Is this a family photo?",
    "In the twilight of our lives, what do we admire the most?",
    "Personally, it’s the warmth of our family, the bonds that have weathered the storms of life.",
    "In previous stages we push ourselves harder, ",
    "hoping that success in our careers will translate to happiness for our family",
    "so this stage will do the next job: family's happiness is what truly matters ",
    " As we embrace this stage of life, let’s celebrate those who have walked this journey with us.", 
    " In our 60s, we come to realize ",
    "the true treasure lies not in the years we've counted, but in the moments we've shared.",
    "Cherish for everything"
];

var currentPhraseIndex = 0;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'ArrowDown') {
        nextText();
    } else if (event.code === 'ArrowUp') {
        previousText();
    }
});


function nextText() {
    currentPhraseIndex = (currentPhraseIndex + 1) % stage1Phrases.length;
    localStorage.setItem('currentPhraseIndex', currentPhraseIndex); // Save the index in localStorage
    updateText();
}

function previousText() {
    currentPhraseIndex = (currentPhraseIndex - 1 + stage1Phrases.length) % stage1Phrases.length;
    localStorage.setItem('currentPhraseIndex', currentPhraseIndex); // Save the index in localStorage
    updateText();
}


function updateText() {
    //  current phrase
    let currentPhrase = IntroPhrases[currentPhraseIndex];
        if (userName !== "") {
        currentPhrase = currentPhrase.replace("{userName}", userName);
    }

    //  Intro text
    let textIntro = document.getElementById('textIntro');
    if (textIntro) {
        textIntro.textContent = currentPhrase;
    }

   

    // stage 1 text
    let textStage1 = document.getElementById('textStage1');
    if (textStage1) {
        let stage1Phrase = stage1Phrases[currentPhraseIndex];
        if (userName !== "") {
            stage1Phrase = stage1Phrase.replace("{userName}", userName);
        }
        textStage1.textContent = stage1Phrase;
    }

    // stage 2 text
    let textStage2 = document.getElementById('textStage2');
    if (textStage2) {
        let stage2Phrase = stage2Phrases[currentPhraseIndex];
        if (userName !== "") {
            stage2Phrase = stage2Phrase.replace("{userName}", userName);
        }
        textStage2.textContent = stage2Phrase;
    }

    let textStage3 = document.getElementById('textStage3');
    if (textStage3) {
        let stage3Phrase = stage3Phrases[currentPhraseIndex];
        if (userName !== "") {
            stage3Phrase = stage2Phrase.replace("{userName}", userName);
        }
        textStage3.textContent = stage3Phrase;
    }
}