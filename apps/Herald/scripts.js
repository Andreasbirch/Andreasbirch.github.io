async function submit() {
    // Get the chat box input
    var chatInput = document.getElementById('chat-input').value;

    // Clear the chat box input 
    document.getElementById('chat-input').value = '';
    // Disable the submit button
    $('#chat-submit').attr('disabled', true);

    //Submit user input
    sendMessage(chatInput, true);

    if(chatInput.includes(test2Text)) {
        sendMessage("Sure, we will change the title");
        await botRespond("Here, we changed the title");
        var replacedhtml = $('#result').html().replaceAll("Delicious Jams", "Jammin' Good");
        $('#result').html(replacedhtml); //Replace title
    } else if(chatInput.includes(test3Text)) {
        sendMessage("Not a problem, hang on!");
        await botRespond("Here is a new picture");
        $('#about-img').attr('src', 'https://cdn.pixabay.com/photo/2017/10/15/09/46/farmhouse-2853047_1280.jpg');
    } else {
        await botRespond("Here you go"); //Wait for fake bot to "generate" website
        
        //Submit jam website
        let htmlString = getJamWebsite();
        $('#result').html(htmlString);
        insertImages();
    }

    // Add an event listener to the form
    document.querySelector('#contact form').addEventListener('submit', function(event) {
        // Prevent the form from submitting (which would refresh the page)
        event.preventDefault();

        // Clear the form fields
        this.reset();

        // Show a pop-up message
        alert('Thanks for reaching us');
    });
}

function handleUserInput(userInput) {

}


async function botRespond(message) {
    //Append speech bubble with loading dots
    sendMessage(`<div class="loading-dots"> <h1 class="dot one">.</h1><h1 class="dot two">.</h1><h1 class="dot three">.</h1> </div>`, false);
    
    $('#chat-submit').attr('disabled', true); //Disable user input while "processing"
    await sleep(1000); //Sleep for 1sec to mimic processing
    $('#chat-submit').attr('disabled', false); //Enable user input after "processing"
    
    $('#conversation-container').find("div:last").remove();
    $('#conversation-container').find("div:last").remove();
    sendMessage(message, false);
}

//Enable/disable submit button based on input
$('#chat-input').on('input', function(e) {
    let userInput = e.target.value;
    if(userInput.length > 0) {
        $('#chat-submit').attr('disabled', false);
    } else {
        $('#chat-submit').attr('disabled', true);
    }
});



function sendMessage(message, senderIsHuman) {
    let conversationContainer = $('#conversation-container');
    let htmlStr = 
    `<div class="row" style="margin-bottom: 10px">
        <div class="col">
            <div class="msg ${senderIsHuman? "offset-2 msg-human" : "msg-bot"}">
                ${message}
            </div>
        </div>
    </div>`
    conversationContainer.append(htmlStr);
}

function getImgFromQuery(queryString) {
    let encoded_query = encodeURIComponent(queryString);
    let query = `https://pixabay.com/api/?key=37514600-a6e747b727065313c7aff02a4&q=${encoded_query}`;
    let imgLink = fetch(query)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            if(data.hits.length == 0) {
                return getImgFromQuery(queryString.substr(queryString.indexOf(" ") + 1)) //Remove first word from string, and try again
            } else {
                return data.hits[0].webformatURL;
            }
        });
    return imgLink;
}

const queries = {
    "about.jpg": "jam production process",
    "product1.jpg": "strawberry jam jar",
    "product2.jpg": "blueberry jam jar",
    "product3.jpg": "mixed berry jam jar"
}
  
function insertImages() {
    for (const key in queries) {
        if (Object.hasOwnProperty.call(queries, key)) {
            const element = queries[key];
            console.log("Element: ", element);
            getImgFromQuery(element).then(function (imgLink) {
                let elem = $(`img[src$='${key}']`);
                console.log(elem);
                console.log({"element": elem, "link": imgLink});
                elem.attr('src', imgLink);
            });
        }
    }
}

function getJamWebsite() {
    return `<body>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#" id="project-title">Delicious Jams</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#products">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Home Section -->
  <section id="home" class="py-5">
    <div class="container text-center">
      <h1>Welcome to Delicious Jams</h1>
      <p class="lead">Handcrafted, flavorful jams made with love</p>
      <a href="#products" class="btn btn-primary btn-lg">Explore Our Jams</a>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus elit vitae felis ullamcorper, id
            lacinia
            nunc fermentum. In hac habitasse platea dictumst. Curabitur feugiat finibus leo, id dapibus ligula
            scelerisque
            non.</p>
        </div>
        <div class="col-lg-6">
          <img src="about.jpg" id="about-img" alt="About Us" class="img-fluid">
        </div>
      </div>
    </div>
  </section>

  <!-- Products Section -->
  <section id="products" class="py-5">
    <div class="container">
      <h2>Our Products</h2>
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <img src="product1.jpg" id="product1-img" class="card-img-top" alt="Jam 1">
            <div class="card-body">
              <h5 class="card-title">Strawberry Jam</h5>
              <p class="card-text">Made with fresh strawberries</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card mb-4">
            <img src="product2.jpg" class="card-img-top" alt="Jam 2">
            <div class="card-body">
              <h5 class="card-title">Blueberry Jam</h5>
              <p class="card-text">Delicious blueberry flavor</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card mb-4">
            <img src="product3.jpg" class="card-img-top" alt="Jam 3">
            <div class="card-body">
              <h5 class="card-title">Mixed Berry Jam</h5>
              <p class="card-text">Blend of strawberries, blueberries, and raspberries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-5 bg-light">
    <div class="container">
      <h2>Contact Us</h2>
      <div class="row">
        <div class="col-lg-6">
          <form>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Name">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
              <textarea class="form-control" rows="5" placeholder="Message"></textarea>
            </div>
            <button class="btn btn-primary">Send Message</button>
          </form>
        </div>
        <div class="col-lg-6">
          <p>123 Main Street</p>
          <p>City, State, ZIP</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-light text-center py-3">
    <p>&copy; 2023 Delicious Jams. All rights reserved.</p>
  </footer>

  <!-- Bootstrap JS -->`;
}

const test1Text = 'I would like you to generate a website for a company producing jam.';
const test2Text = `I don't like the title Delicious Jams, can you rename it to "Jammin' Good"?`;
const test3Text = `I don't like the picture you chose for the about section. How about a picture of a farm?`;

function test1() {
    $('#chat-input').val(test1Text);
    $('#chat-submit').attr('disabled', false);
}

function test2() {
    $('#chat-input').val(test2Text);
}

function test3() {
    $('#chat-input').val(test3Text);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}