To run the project you need:

# 1. npm istall

# 2. gulp watch

To build the project you need:

# 1. npm install (if you haven't done it yet)

# 2. gulp build

Please note gulp in this project was configured with the nodeJS v18.

You can see the current deploy here: https://valentynfediuk.github.io/sharonsblogake/dist/

# How emoji animation works:

CSS part of the animation is:

```
.emoji-box .emoji-box__ico {
  display: none;
}

.emoji-box.active .emoji-box__ico {
  transform: scale(0);
  display: none;
  transition: 0s;
}

.emoji-box.active .emoji-box__ico.active {
  display: block;
  transform: scale(1);
  animation: emoji-appear 0.5s linear forwards;
}

@keyframes emoji-appear {
  0% {
    display: none;
    transform: scale(0);
  }
  1% {
    display: block;
    transform: scale(0);
  }
  65% {
    transform: scale(1);
  }
  85% {
    transform: scale(1.35);
  }
  100% {
    transform: scale(1);
  }
}
```


The js part is:

 
    First of all it uses inview plugin that adds event inview. It links in index,html at the bottom of body tag 

    ```
    <script src="js/jq.inview.min.js"></script>
    ````

    You have to remember that the event parammeter is always getting from here:

    ```
     $('.emoji-box.active').on('inview', (event, isInView) => {
    ```

    and the name parammeter is always (.like-ico, .heart-ico or .wow-ico)

    ```
    switch (randomEmoji) {
        case 1:
            emojiAdd(event, '.like-ico', counterValue, emojiId);
            break;
        case 2:
            emojiAdd(event, '.heart-ico', counterValue, emojiId);
            break;
        case 3:
            emojiAdd(event, '.wow-ico', counterValue, emojiId);
            break;
        default:
            break;
    }
    ```

    We have a variable emojiCountersData that fetches from local storage emojiCounters

    ```
    let emojiCountersData = JSON.parse(localStorage.getItem('emojiCounters') || '[]');
    ```
    
    Example:
    [{"id":"3","count":6},{"id":"1","count":7},{"id":"2","count":5}]

    or if we have no it in local storage it sets an empty array.

    setStorageEmoji function takes item and name as parameters, sets variable itemSelector based on item's classList that is equal to name parameter.
    if itemSelector does not contain value 'active' we add value active to this variable.

    ```
    const setStorageEmoji = (item, name) => {
        const itemSelector = item.querySelector(name).classList;
        if (!itemSelector.contains('active')) {
            itemSelector.add('active');
        }
    }
    ```

    In the next block of code we have document.querySelectorAll('.emoji-box.active').forEach
    and inside of it we have another emojiCountersData.forEach that sets variable likesIdValue that gets data from an element that is up to css selector .emoji-box.active an attribute data-emoji-id after this we have condition if (likesIdValue === storageItem.id) that compares data attribute from active emoji-box and data from local storage (id field) if the condition is true
    for element with data atribute that mathches the  storageItem.id field from local storage we are lokking for element inside of it with class emoji-box__like-count and put into this tag storageItem.count field from local storage, after this line we have condition if (likesIdValue === storageItem.id) where we compare storageItem.count field from local storage to be less than 5 if it is true we call function setStorageEmoji(item, '.like-ico'); and pass the item from the most top forEach (.emoji-box.active element) and pass class for like icon, if the condition is false we call 3 functions 
    setStorageEmoji(item, '.like-ico'), setStorageEmoji(item, '.heart-ico'), setStorageEmoji(item, '.wow-ico');

    ```
    document.querySelectorAll('.emoji-box.active').forEach(item => {
        emojiCountersData.forEach(storageItem => {
            const likesIdValue = item.getAttribute('data-emoji-id');

            if (likesIdValue === storageItem.id) {
                item.querySelector('.emoji-box__like-count').innerHTML = storageItem.count;
                if (storageItem.count < 5) {
                    setStorageEmoji(item, '.like-ico');
                } else {
                    setStorageEmoji(item, '.like-ico');
                    setStorageEmoji(item, '.heart-ico');
                    setStorageEmoji(item, '.wow-ico');
                }
            }
        })
    })
    ```

    In the next block of code we have emojiCounterInc function that takes event (emoji-box.active inview event) and counterValue 
    (we assign this as variable when fires .emoji-box.active inview event from .emoji-box__like-count html tag content) as parammeters. In this function we select an element .emoji-box__like-count that is inside of passed to function event's target. We set innerHTML in this tag to the counterValue (number that is passed as parrameter to this function) and increment it by 1 and return it.

    ```
    const emojiCounterInc = (event, counterValue) => {
        return event.target.querySelector('.emoji-box__like-count').innerHTML = parseInt(counterValue + 1);
    }
    ```

    In the targetEmoji function we take parameters event (our .emoji-box.active inview event) and name (.like-ico, .heart-ico or .wow-ico). In the function we set a variable emojiSelector (value from this variable is fetched from event's target (we find a tag that is in .emoji-box.active with class that is equal to name parammeter)), after this we have condition if (emojiSelector.contains('active'))
    if the condition is true we remove the class 'active' and set it back in 100ms second, if the condition is false we just add çlass 'active' to emojiSelector's tag.

    ```
    const targetEmoji = (event, name) => {
        const emojiSelector = event.target.querySelector(name).classList;
        if (emojiSelector.contains('active')) {
            emojiSelector.remove('active');
            setTimeout(() => {
                emojiSelector.add('active');
            }, 100);
        } else
            emojiSelector.add('active');
    }
    ```

    In function emojiAdd we take (event: (.emoji-box.active inview event), name: (.like-ico, .heart-ico or .wow-ico), counterValue: (we are locking for it in the inview event's target inner tags with class .emoji-box__like-count innerHTML), emojiId: (we are looking for it in evet's target html tags with class .emoji-box__like-count data-attributes (data-emoji-id) value)). Inside of the function we call targetEmoji(event, name), at the next line of code we call emojiCounterInc(event, counterValue) (increment) emoji counter by 1, in next line we have a variable comment that is an object with field id: emojiId (we are looking for it in evet's target html tags with class .emoji-box__like-count data-attributes (data-emoji-id) value)) and count: counterValue - 

    ```
    let counterValue = parseInt(event.target.querySelector('.emoji-box__like-count').innerHTML);
        if (!counterValue) {
            counterValue = 0;
        }
    ```

    At the following line of code we have found variable that is assigned true if at least one item of emojiCountersData.id (data from local storage)
    is equal to emojiId

    ```
    const emojiId = event.target.getAttribute('data-emoji-id');
    ```

    Then we have condition if found is true emojiCountersData.forEach item inside of this forEach we have condition if the item.id is equal to emojiId
    ```
     const emojiId = event.target.getAttribute('data-emoji-id');
    ```
    we assign item.count = counterValue;

    ```
    let counterValue = parseInt(event.target.querySelector('.emoji-box__like-count').innerHTML);
    if (!counterValue) {
        counterValue = 0;
    }
    ```
    in the next line we set the modified emojiCountersData to local storage. If the condition is false we do emojiCountersData.push(comment);
    and set it to the local storage

    ```
    const emojiAdd = (event, name, counterValue, emojiId) => {
        targetEmoji(event, name);
        emojiCounterInc(event, counterValue);

        const comment = {
            id: emojiId,
            count: counterValue
        };

        const found = emojiCountersData.some(function (el) {
            return el.id === emojiId;
        });

        if (found) {
            emojiCountersData.forEach(function(item){
                if (item.id === emojiId) {
                    item.count = counterValue;
                    localStorage.setItem('emojiCounters', JSON.stringify(emojiCountersData));
                }
            })
        } else {
            emojiCountersData.push(comment);
            localStorage.setItem('emojiCounters', JSON.stringify(emojiCountersData));
        }
    }
    ```

    In the next line of code we set the global variable ticker = true, 

    ```
        let ticker = true;
    ```
    
    Next, we declare function tickerReset inside of the function we set the variable ticker to true after 10 seconds after the function was called.

    ```
    const tickerReset = () => {
        setTimeout( () => {
            ticker = true;
        }, 10000);
    };
    ```

    In the next block of code we add the inview event listener to .emoji-box.active if the event inview fires the callback takes (event and isInView). The ivent fires two times when the block appeared in the window of the browser and if the block is diapeared from the window of the browser. isInView returns true if element appeared in view and false if the element disapeared from view. Inside of the callback at the first line we set emojiId
    ```
    const emojiId = event.target.getAttribute('data-emoji-id');
    ```
    and the counterValue variable (if there is nothing to set it is set to 0)
    ```
    let counterValue = parseInt(event.target.querySelector('.emoji-box__like-count').innerHTML);
      if (!counterValue) {
            counterValue = 0;
        }
    ```
    Next, we have condition isInView && ticker (if the element is in window of the browser and ticker var is true) by default the ticker variable is true. In this condition we have variable randomTicker that gets random number between 550 and 2555
    and variable randomEmoji that gets random number between 1 and 3. Finally, we have setTimeout with switch case that takes randomEmoji variable and based on randomly generated number. We have 3 cases we call the same function emojiAdd that takes 4 parammeters (event, '.like-ico', '.heart-ico' or '.wow-ico', counterValue, emojiId), then ticker is set to false and the tickerReset function is called. The set timeout depends on variable randomTicker.

```
$('.emoji-box.active').on('inview', (event, isInView) => {
        const emojiId = event.target.getAttribute('data-emoji-id');
        let counterValue = parseInt(event.target.querySelector('.emoji-box__like-count').innerHTML);
        if (!counterValue) {
            counterValue = 0;
        }

        if (isInView && ticker) {
            const randomTicker = randomInt(550, 2555);
            let randomEmoji = randomInt(1, 3);
            setTimeout(() => {
                switch (randomEmoji) {
                    case 1:
                        emojiAdd(event, '.like-ico', counterValue, emojiId);
                        break;
                    case 2:
                        emojiAdd(event, '.heart-ico', counterValue, emojiId);
                        break;
                    case 3:
                        emojiAdd(event, '.wow-ico', counterValue, emojiId);
                        break;
                    default:
                        break;
                }
                ticker = false;
                tickerReset();
            }, randomTicker);
        }
    });
```