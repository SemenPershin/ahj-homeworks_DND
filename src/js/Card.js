export class Card {
    constructor(button) {
        this.button = button;
        this.newCard = undefined;
        this.parentElement = undefined;
        this.closestElementRects = undefined;
        this.newCardText = undefined;
        this.closeButton = undefined;
        this.newCardTextDiv = undefined;
        this.listOfAnotherCard = [];

        this.addCard()
        this.cardMove = this.cardMovefunction.bind(this)
    }

    addCard() {
        this.parentElement = this.button.closest(".column_of_desk");
        this.inputCreate();

    }

    deleteCard() {
        this.parentElement.removeChild(this.newCard);
    }

    following(event) {
        this.newCard.style.left = event.clientX - this.newCard.offsetWidth / 2 + "px";
        this.newCard.style.top = event.clientY - this.newCard.offsetHeight / 2 + "px";
    }

    cardMovefunction(event) {
        event.preventDefault();
        this.newCard.classList.add("drag");
        this.following(event);
    }

    inputCreate() {
        this.newCard = document.createElement("input");
        this.newCard.type = "text";
        this.parentElement.insertBefore(this.newCard, this.button);
        this.newCard.focus();

        this.newCard.addEventListener("change", () => {
            this.inputToDiv()
        })
    }

    inputToDiv() {
        this.newCardText = this.newCard.value;
        this.parentElement.removeChild(this.newCard);
        this.newCard = document.createElement("div");
        this.newCard.classList.add("card");
        this.parentElement.insertBefore(this.newCard, this.button);

        this.newCardTextDiv = document.createElement("div");
        this.newCardTextDiv.classList.add("text_card");
        this.newCard.append(this.newCardTextDiv);
        this.newCardTextDiv.textContent = this.newCardText

        this.closeButton = document.createElement("div");
        this.closeButton.classList.add("close_button");
        this.newCard.append(this.closeButton);
        this.closeButton.textContent = `\uE951`

        this.closeButton.addEventListener("mousedown", () => {
            this.parentElement.removeChild(this.newCard)
        })

        this.newCard.addEventListener("mousedown", (event) => {
            event.preventDefault();
            document.addEventListener("mousemove", this.cardMove);

        })

        this.newCard.addEventListener("mouseup", (event) => {
            this.newCard.classList.remove("drag");
            document.removeEventListener("mousemove", this.cardMove);


            if (document.elementFromPoint(event.clientX, event.clientY).closest(".column_of_desk") != null &&
                document.elementFromPoint(event.clientX, event.clientY).closest(".column_of_desk") != this.parentElement) {

                this.parentElement = document.elementFromPoint(event.clientX, event.clientY).closest(".column_of_desk");
                this.button = this.parentElement.querySelector(".add_button");

            }

            if (document.elementFromPoint(event.clientX, event.clientY).closest(".column_of_desk") != null) {
                this.listOfAnotherCard = Array.from(document.elementFromPoint(event.clientX, event.clientY).closest(".column_of_desk").querySelectorAll(".card"))

                let cardShiftPosition = 0;
                let findStatus;

                findStatus = this.listOfAnotherCard.find((card) => {
                    const cardRect = card.getBoundingClientRect()

                    if (card != this.newCard) {
                        if (event.clientY < cardRect.top + cardRect.height / 2 - cardShiftPosition) {
                            this.parentElement.insertBefore(this.newCard, card)
                            return true
                        }
                    } else {
                        cardShiftPosition = cardRect.height
                    }

                })

                if (findStatus == undefined) {
                    this.parentElement.insertBefore(this.newCard, this.button)
                }
            }


        })
    }
}