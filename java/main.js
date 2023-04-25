class GetDataFromApi {
  url = "";
  data = null;

  constructor(newURL) {
    this.url = newURL;
  }

  async getData() {
    await fetch(this.url)
      .then(function (response) {
        return response.json();
      }).then((data) => {
       
        const shuffledData = data["episodes"].sort(() => 0.5 - Math.random());
        this.data = shuffledData.slice(0, 4);
      });
    return this.data;
  }
}


class Header {
  header;
  headerfigure;
  headerIElement;
  headerText;
  placeToRenderHeader;

  constructor(placeToRenderHeader) {
    this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
    this.header = document.createElement("header");
    this.header.classList = "header";
    this.headerfigure = document.createElement("figure");
    this.headerfigure.classList = "header__happyLogo";
    this.headerIElement = document.createElement("i");
    this.headerIElement.classList = "fa-solid fa-podcast";
    this.headerText = document.createElement("h2");
    this.headerText.classList = "header__happyLogoText";
    this.headerText.innerText = "Collection of Happiness";
  }

  render() {
    this.placeToRenderHeader.appendChild(this.header);
    this.header.appendChild(this.headerfigure);
    this.headerfigure.appendChild(this.headerIElement);
    this.headerfigure.appendChild(this.headerText);
  }
}


class HappyMain {
  placeToRenderMain;
  leftSection;
  rightSection;
  happyFooter;

  constructor(placeToRenderMain, data) {
    this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];
    this.mainElement = document.createElement("main");
    this.mainElement.classList = "collection";

    this.rightSection = new happyRightSection(this.mainElement, this, data, this.leftSection);
    this.leftSection = new happyLeftSection(this.mainElement, data, this.rightSection);
    this.happyFooter = new Footer("body");
  }

  render() {
    this.placeToRenderMain.appendChild(this.mainElement);
    this.leftSection.render();
    this.rightSection.render();
    this.happyFooter.render();
  }
}


class happyLeftSection {
  leftSection;
  leftSectionElement;
  mainElement;
  data;
  happyRightSection;
  footer;
  

  
  constructor(mainElement, data , happyRightSection, footer) {
    this.mainElement = mainElement;
    this.data = data;
    this.happyRightSection = happyRightSection;
    this.footer = footer;


    this.leftSectionElement = document.createElement("section");
    this.leftSectionElement.classList = "sectionLeft";





    for (let i = 0; i < data.length; i++) {

      this.sectionFigure = document.createElement("figure");
      this.sectionFigure.classList = "sectionLeft__article";
      this.sectionFigure.style.backgroundImage = `url(${this.data[i]["image"]["src"]})`;

      this.figureDate = document.createElement("p");
      this.figureDate.innerText = this.data[i]["date (dd-mm-yyyy)"];
      this.figureDate.classList = "sectionLeft__date";

      this.figureTitle = document.createElement("p");
      this.figureTitle.classList = "sectionLeft__title";
      this.figureTitle.innerText = this.data[i]["title"];

      this.sectionFigure.appendChild(this.figureDate);
      this.sectionFigure.appendChild(this.figureTitle);

      this.sectionFigure.addEventListener("click", () => {
        this.changeRightSection(this.data[i]);
      });

      this.leftSectionElement.appendChild(this.sectionFigure);
    }
  }

  changeRightSection(clickedEpisode){
    this.happyRightSection.changeRightSectionContent(clickedEpisode);
  }




  render() {
    this.mainElement.appendChild(this.leftSectionElement);
  }
}


class happyRightSection {
    
  mainElement;
  rightSectionElement;
  sectionFigure;
  figureDate;
  figureTitle;
  audioElement;
  articleElement;
  textRightELement;
  buttonsElement;
  buttonAdudioElement;
  buttonSourceElement;
  data;

  changeRightSection;



  constructor(mainElement, HappyMain, data, happyLeftSection) {
    this.mainElement = mainElement;
    this.HappyMain = HappyMain;
    this.data = data;
    this.happyLeftSection = happyLeftSection;
  


    this.rightSectionElement = document.createElement("section");
    this.rightSectionElement.classList = "sectionRight";

    this.sectionFigure = document.createElement("figure");
    this.sectionFigure.classList = "sectionRight__article";
    this.sectionFigure.style.backgroundImage = "url(img/img1.webp)"

    this.figureDate = document.createElement("p");
    this.figureDate.classList = "sectionLeft__date";
    this.figureDate.innerText = "02-03-2023";
      
    this.figureTitle = document.createElement("p");
    this.figureTitle.classList = "sectionLeft__title";
    this.figureTitle.innerText = "Why We Need Friends with Shared Interest";
    
    this.audioElement = document.createElement("audio");
    this.audioElement.classList = "sectionRight__audio"
      
      
        
    this.articleElement = document.createElement("article");
    this.articleElement.classList = "sectionRight__textArea";
    this.articleElement.innerText = "She's the world's leading animal behaviorist and an Autism advocacy leader. Guest Temple Grandin shares what kind of support systems led her to success, and we hear about how community, and lack thereof, affects our health and ability to succeed."

    this.textRightELement = document.createElement("p");
    this.textRightELement.classList = "sectionRight__textRight";

    this.buttonsElement = document.createElement("div");
    this.buttonsElement.classList = "sectionRight__buttons";

    this.buttonAudioElement = document.createElement("button");
    this.buttonAudioElement.classList = "sectionRight__button";
    this.buttonAudioElement.innerText = "audio";

      

    this.buttonSourceElement = document.createElement("button");
    this.buttonSourceElement.classList = "sectionRight__button sectionRight__button--source";
    this.buttonSourceElement.innerText = "source >";
    this.buttonSourceElement.addEventListener('click', () => {
      window.location.href = data.episodes[clickedEpisode].url;
    });

      

      
  }


  changeRightSectionContent(clickedEpisode,) {
    const backgroundImage = clickedEpisode.image.src;
    this.sectionFigure.style.backgroundImage = `url(${backgroundImage})`;
    this.articleElement.innerText = clickedEpisode.coverText;
    this.figureDate.innerText = clickedEpisode["date (dd-mm-yyyy)"];
    this.figureTitle.innerText = clickedEpisode.title;
    this.audioElement.src = clickedEpisode.audio;

    this.buttonSourceElement.addEventListener('click', () => {
      window.location.href = clickedEpisode.url;
    });
  
    this.sectionFigure.addEventListener('click', () => {
      this.audioElement.removeAttribute('controls');
    });
  
    this.buttonAudioElement.addEventListener('click', () => {
      if (this.audioElement.hasAttribute("controls")) {
        this.audioElement.removeAttribute("controls");
        this.audioElement.pause();
      } else {
        this.audioElement.setAttribute("controls", "");
        this.audioElement.play();
      }
    });
  }


  
  render() {
    this.mainElement.appendChild(this.rightSectionElement);

    this.rightSectionElement.appendChild(this.sectionFigure);
    this.sectionFigure.appendChild(this.figureDate);
    this.sectionFigure.appendChild(this.figureTitle);

    this.rightSectionElement.appendChild(this.audioElement);
    this.rightSectionElement.appendChild(this.articleElement);
    this.articleElement.appendChild(this.textRightELement);

    this.rightSectionElement.appendChild(this.buttonsElement);
    this.buttonsElement.appendChild(this.buttonAudioElement);
    this.buttonsElement.appendChild(this.buttonSourceElement);
  }

}

class Footer {
  placeToRenderFooter;
  footerElement;
  footerTitleElement;

  constructor(placeToRenderFooter) {
    this.placeToRenderFooter = document.getElementsByTagName(placeToRenderFooter)[0];
    this.footerElement = document.createElement("footer");
    this.footerElement.classList = "footer";
    this.footerTitleElement = document.createElement("h4");
    this.footerTitleElement.classList = "footer__h4";
    this.footerTitleElement.innerText = "Gemaakt door Daniel Dammers SD2D Mediacollege";
  }

  render() {
    this.placeToRenderFooter.appendChild(this.footerElement);
    this.footerElement.appendChild(this.footerTitleElement);
  }
}

  
class App {
  constructor() {
    this.Header = new Header("body");
    this.happyFooter = new Footer("body");
    this.getDataFromApi = new GetDataFromApi("./data/data.json");


    this.getDataFromApi.getData().then((data) => {
      this.main = new HappyMain("body", data);
      this.Header.render();
      this.main.render();
      
      
    });
  }
}

const app = new App();
