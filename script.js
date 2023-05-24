// Get DOM objects

var description_list = document.getElementsByClassName("close");
var image_list = document.getElementsByClassName("image");

var welcomeModal = document.getElementById("welcome-modal");
var quizModal = document.getElementById("quiz-modal");

var user_input = quizModal.getElementsByTagName('input');

var quiz_button = document.getElementById("quiz-button");
var submit_answers_button = document.getElementById("submit-answers");

// DOM properties constants
const no_blur = "blur(0)";
const blur_severity = "blur(8px)";

const wrong_answer_color = "red";
const correct_answer_color = "green";

// Dictionary to keep track of image and their description pairs

var image_and_description_pairs = {
  "direct-supervisor-image": "direct-supervisor-modal",
  "co-worker-image": "co-worker-modal",
  "injured-image": "injured-modal",
  "physician-image": "physician-modal",
  "union-representative-image": "union-representative-modal",
  "insurance-provider-image": "insurance-provider-modal",
  "disability-case-management-professional-image": 
  "disability-case-management-professional-modal"
};

// Dictionary to keep track of answer key

var answer_key = {
  "first-question": "option-3",
  "second-question": "option-1",
  "third-question": "option-2",
  "fourth-question": "option-2",
  "fifth-question": "option-1",
  "sixth-question": "option-4",
  "seventh-question": "option-1",
};

/*
-------------------------------------------------------------------------------
------------------------ Helper Functions -------------------------------------
-------------------------------------------------------------------------------
*/

var closeDescriptionModal = function() {
  let current_modal = document.getElementById
                      (event.srcElement.parentElement.id);
  // Make modal invisible
  current_modal.style.display = "none";
  
  // Unblur images and ,make them clickable
  for (var i = 0; i < image_list.length; ++i) {
    image_list[i].style.filter = no_blur;
    image_list[i].style.pointerEvents = "auto";
  }

  // Display quiz button
  quiz_button.style.display = "block";
}

var openDescriptionModal = function() {
  let current_modal = document.getElementById
                      (image_and_description_pairs[event.srcElement.id]);
  // Display modal
  current_modal.style.display = "block";

  // Blur images and make them unlickable
  for (var i = 0; i < image_list.length; ++i) {
    image_list[i].style.filter = blur_severity;
    image_list[i].style.pointerEvents = "none";
  }

  // Hide quiz button
  quiz_button.style.display = "none";

  // Hide Submit Answers button
  submit_answers_button.style.display = "none";
}

var openWelcomeModal = function() {
  // Display modal
  welcomeModal.style.display = "block";

  // Blur images and make them unlickable
  for (var i = 0; i < image_list.length; ++i) {
    image_list[i].style.filter = blur_severity;
    image_list[i].style.pointerEvents = "none";
  }

  // Hide quiz button
  quiz_button.style.display = "none";
}

var closeWelcomeModal = function() {
  // Make modal invisible
  welcomeModal.style.display = "none";
  
  // Unblur images and ,make them clickable
  for (var i = 0; i < image_list.length; ++i) {
    image_list[i].style.filter = no_blur;
     image_list[i].style.pointerEvents = "auto";
  }

  // Display quiz button
  quiz_button.style.display = "block";
}

var openQuizModal = function() {
  // Display modal
  quizModal.style.display = "block";

  // Display Submit Answers button
  submit_answers_button.style.display = "block";

  // Blur images
  for (var i = 0; i < image_list.length; ++i) {
    image_list[i].style.filter = blur_severity;
    image_list[i].style.pointerEvents = "none";
  }

  // Hide quiz button
  quiz_button.style.display = "none";
 
  // Remove color coding of answers and previous score
  for (var i = 0; i < user_input.length; ++i) {
    if (user_input[i].type == "radio") {
      let user_input_text = user_input[i].nextElementSibling;
      user_input_text.style.color = "initial";
    }
  }
  document.getElementById("quiz-results").innerHTML= "";
}

var calcQuizResults = function() {
  var correct_answers = 0;
  let num_questions = 7;

  for (var i = 0; i < user_input.length; ++i) {
    if (user_input[i].type == "radio" && user_input[i].checked == true) {
    
      // User answered it right
      if (user_input[i].value == answer_key[user_input[i].name]) {
        // Highlight Correct Answer
        let user_input_text = user_input[i].nextElementSibling;
        user_input_text.style.color = correct_answer_color;

        // increment correct answer count
        correct_answers++;
      } 
      // User answered wrong 
      else {
        // Highlight Wrong Answer
        let user_input_text = user_input[i].nextElementSibling;
        user_input_text.style.color = wrong_answer_color;

        // Highlight Correct Answer
        let correct_answer_label_id = user_input[i].name + "-" + 
                                      answer_key[user_input[i].name];
        let correct_answer_text_label = document.getElementById
                                        (correct_answer_label_id).
                                        nextElementSibling;
        correct_answer_text_label.style.color = correct_answer_color;        
      }
    }
  }

  // Hide Submit Answers button
  submit_answers_button.style.display = "none";

  // Display results
  document.getElementById("quiz-results").innerHTML = "You answered " + 
                                                      correct_answers + 
                                                      " / " + num_questions
                                                      + " questions \
                                                      correctly. <p> \
                                                      THANK YOU </p>";
}

// Initialize onClick behavior on DOM objects
for (var i = 0; i < description_list.length; ++i) {
  description_list[i].addEventListener('click', closeDescriptionModal, false);
}

for (var i = 0; i < image_list.length; ++i) {
  image_list[i].addEventListener('click', openDescriptionModal, false);
}
