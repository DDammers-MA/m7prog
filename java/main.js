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

  constructor(placeToRenderMain, data) {
    this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];
    this.mainElement = document.createElement("main");
    this.mainElement.classList = "collection";

    this.leftSection = new happyLeftSection(this.mainElement, data);

    this.rightSection = new happyRightSection(this.mainElement, data);
    
  }

  render() {
    this.placeToRenderMain.appendChild(this.mainElement);
    this.leftSection.render();
    this.rightSection.render();
  }
}


class happyLeftSection {
  leftSection;
  leftSectionElement;
  mainElement;
  data;

  constructor(mainElement, data) {
    this.mainElement = mainElement;
    this.data = data
    this.leftSectionElement = document.createElement("section");
    this.leftSectionElement.classList = "sectionLeft";

    for (let i = 0; i < data.length; i++) {
      this.sectionFigure = document.createElement("figure");
      this.sectionFigure.classList = "sectionLeft__article";
      this.sectionFigure.style.backgroundImage = "url(img/img2.webp)";

      this.figureDate = document.createElement("p");
      this.figureDate.innerText = this.data[i]["date (dd-mm-yyyy)"];
      this.figureDate.classList = "sectionLeft__date";

      this.figureTitle = document.createElement("p");
      this.figureTitle.classList = "sectionLeft__title";
      this.figureTitle.innerText = this.data[i]["title"];

      this.sectionFigure.appendChild(this.figureDate);
      this.sectionFigure.appendChild(this.figureTitle);

      this.leftSectionElement.appendChild(this.sectionFigure);
    }
  }

  render() {
    this.mainElement.appendChild(this.leftSectionElement);
  }
}


class happyRightSection{
    
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
  



    constructor(mainElement, HappyMain, data) {
      this.mainElement = mainElement;
      this.HappyMain = HappyMain;
      this.data = data;
      

      this.rightSectionElement = document.createElement("section");
      this.rightSectionElement.classList = "sectionRight";

      this.sectionFigure = document.createElement("figure");
      this.sectionFigure.classList = "sectionLeft__article";

      this.figureDate = document.createElement("p");
      this.figureDate.classList = "sectionLeft__date";
      
    
      this.figureTitle = document.createElement("p");
      this.figureTitle.classList = "sectionLeft__title";
  
      this.audioElement = document.createElement("audio");
      
      this.articleElement = document.createElement("article");
      this.articleElement.classList = "sectionRight__textArea";

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
  






class App {
  constructor() {
    this.Header = new Header("body");
    this.getDataFromApi = new GetDataFromApi("./data/data.json");

    this.getDataFromApi.getData().then((data) => {
      this.main = new HappyMain("body", data);
      this.Header.render();
      this.main.render();
    });
  }
}

const app = new App();
