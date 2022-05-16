document.addEventListener('DOMContentLoaded', ()=>{
    //bet tabs
    const container = document.querySelector('.main_block');

    let betList = [
        {
            teamOne: 'TEAM 1',
            teamTwo: 'TEAM 2',
            coOne: 1,
            coTwo: 1.5,
            index: 0
        }
    ];
    let userMoney = 6000;

    const userMoneyHTML = document.querySelector('.user_money');
    userMoneyHTML.innerHTML = userMoney;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function removeItems(){
        const betItems = document.querySelectorAll('.bet_item');
        betItems.forEach(item => {
            item.remove();
        });
    }

    function renderBets(arr){
        removeItems();
        arr.map(item => new Bettab(
            item.teamOne, 
            item.teamTwo,
            item.coOne,
            item.coTwo,
            item.index).render());
    }

    class Bettab{
        constructor(teamOne, teamTwo, coOne, coTwo, index){
            this.teamOne = teamOne;
            this.teamTwo = teamTwo;
            this.coOne = coOne;
            this.coTwo = coTwo;
            this.index = index;
        }
        render(){
            const elem = document.createElement('div');
            
            elem.innerHTML = `
                
                    <div class="bet_team_one">
                                <div class="bet_team_one_name">
                                    ${this.teamOne}
                                </div>
                                <div class="bet_team_one_co">
                                    ${this.coOne}
                                </div>
                                <input type="text" placeholder="Coef: ${this.coOne}" 
                                name="betamount" class="bet_team_one_in">

                                <div class="bet_team_one_butt">
                                    BET
                                </div>
                            </div>
                            <div class="bet_team_two">
                                <div class="bet_team_two_name">
                                    ${this.teamTwo}
                                </div>
                                <div class="bet_team_two_co">
                                    ${this.coTwo}
                                </div>
                                <input type="text" placeholder="Coef: ${this.coTwo}" 
                                name="betamount" class="bet_team_two_in">

                                <div class="bet_team_two_butt">
                                    BET
                                </div>
                            </div>
                    </div>
                
                    
            `; 
            elem.classList.add('bet_item');
            container.append(elem);
        
            

            const teamOne = elem.querySelector('.bet_team_one');
            const teamTwo = elem.querySelector('.bet_team_two');
            const teamOneIn = elem.querySelector('.bet_team_one_in');
            const teamTwoIn = elem.querySelector('.bet_team_two_in');
            //click 

            elem.addEventListener('click', (e)=>{
                const ev = e.target;
                if (ev.classList.contains('bet_team_one')){
                   ev.classList.toggle('active');
                   if (teamTwo.classList.contains('active') && teamOne.classList.contains('active')){
                    teamTwo.classList.remove('active');
                    teamOne.classList.add('active');
                   }
                } else if (ev.classList.contains('bet_team_two')){
                    ev.classList.toggle('active');
                    if (teamOne.classList.contains('active') && teamTwo.classList.contains('active')){
                        teamOne.classList.remove('active');
                        teamTwo.classList.add('active');
                    }
                } else if (ev.classList.contains('bet_team_one_butt')){
                    if (teamOneIn.value != ''){
                        setTimeout(()=>{
                            let numb = Math.floor(teamOneIn.value * this.coOne);
                            if (getRandomInt(2) === 1){
                                userMoney += numb;
                                userMoneyHTML.innerHTML = userMoney;
                                showWinTab('win', numb);
                            } else {
                                userMoney -= teamOneIn.value;
                                userMoneyHTML.innerHTML = userMoney;
                                showWinTab('lose', teamOneIn.value);
                            }
                            teamOneIn.value = '';
                            deleteItem(this.index);
                        }, 3000);
                    } else {
                        showWinTab('no');
                    }
                    teamOne.classList.remove('active');
                } else if (ev.classList.contains('bet_team_two_butt')){
                    if (teamTwoIn.value != ''){
                        setTimeout(()=>{
                            let numb = Math.floor(teamTwoIn.value * this.coTwo);
                            if (getRandomInt(2) === 1){
                                userMoney += numb;
                                userMoneyHTML.innerHTML = userMoney;
                                showWinTab('win', numb);
                            } else {
                                userMoney -= teamTwoIn.value;
                                userMoneyHTML.innerHTML = userMoney;
                                showWinTab('lose', teamTwoIn.value);
                            }
                            teamTwoIn.value = '';
                            deleteItem(this.index);
                        }, 3000);
                    } else {
                        showWinTab('no');
                    }
                    teamTwo.classList.remove('active');
                }
            });
        
        }

    }

    renderBets(betList);
    // win/lose tab 
    
    function deleteItem(ind){
        betList = betList.filter(item => item.index != ind);
        renderBets(betList);
    }

    function showWinTab(color, amount = 0){
        const winTab = document.querySelector('.win_tab');
        if (color === 'win'){
            winTab.style.background = "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)";
            winTab.innerHTML = `
                <div class="win_text">You won! +${amount}</div>
            `;
        } else if (color === 'lose'){
            winTab.style.background = 'linear-gradient( 135deg, #FDD819 10%, #E80505 100%)';
            winTab.innerHTML = `
                <div class="win_text">You lose! -${amount}</div>
            `;
        } else if (color === 'no'){
            winTab.style.background = 'linear-gradient( 135deg, #FDD819 10%, #E80505 100%)';
            winTab.innerHTML = `
                <div class="win_text">Fill the gaps!</div>
            `;
        } else if (color === 'nan'){
            winTab.style.background = 'linear-gradient( 135deg, #FDD819 10%, #E80505 100%)';
            winTab.innerHTML = `
                <div class="win_text">Not a number!</div>
            `;
        }
        winTab.classList.add('animated');
        setTimeout(()=>{
            winTab.classList.remove('animated');
        }, 3000);
    }

    //window tab

    const addTab = document.querySelector('.add_tab'),
          plus = document.querySelector('.plus'),
          addButton = document.querySelector('.add_button'),
          inTeamOne = document.querySelector('.input_teamone'),
          inTeamTwo = document.querySelector('.input_teamtwo'),
          inCoOne = document.querySelector('.input_coone'),
          inCoTwo = document.querySelector('.input_cotwo');

    let i = 0;
    function showTab(){
        i++;
        addTab.style.display = "flex";
        plus.innerHTML = 'CLOSE';
        removeItems();
    }

    function hideTab(){
        i--;
        addTab.style.display = "none";
        plus.innerHTML = 'ADD';
        renderBets(betList);
    }
    
    plus.addEventListener('click', ()=>{
        if (i == 0){
            showTab();
        } else {
            hideTab();
            inTeamTwo.value = '';
            inTeamOne.value = '';
            inCoOne.value = '';
            inCoTwo.value = '';
        }
    });

    class Betobj{
        constructor(team1, team2, co1, co2){
            this.teamOne = team1;
            this.teamTwo = team2;
            this.coOne = co1;
            this.coTwo = co2;
            this.index = betList.length;
        }
        push(){
            betList.push(this);
        }
    }

    addButton.addEventListener('click', ()=>{
        if (inTeamOne.value && inTeamTwo.value && inCoOne.value && inCoTwo.value){
            console.log(typeof +inCoOne.value);
            if (inCoOne.value.toLowerCase() !== inCoOne.value.toUpperCase() ||
            inCoTwo.value.toLowerCase() !== inCoTwo.value.toUpperCase()){
                showWinTab('nan');
                inCoOne.value = '';
                inCoTwo.value = '';
            } else {
                new Betobj (
                    inTeamOne.value,
                    inTeamTwo.value,
                    inCoOne.value,
                    inCoTwo.value
                ).push();
                inTeamTwo.value = '';
                inTeamOne.value = '';
                inCoOne.value = '';
                inCoTwo.value = '';
                setTimeout(hideTab, 100);
            }
        } else{
            inTeamTwo.value = '';
            inTeamOne.value = '';
            inCoOne.value = '';
            inCoTwo.value = '';
            showWinTab('no');
        }

       
        
    });
});