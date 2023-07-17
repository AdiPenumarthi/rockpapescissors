import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'
import GameOptions from '../GameOptions'
import {
  AppContainer,
  ScoreCardContainer,
  OptionsContainer,
  Option,
  ScoreCard,
  ScorePhrase,
  Score,
  UserOptionsContainer,
  ResultContainer,
  ResultCardContainer,
  ResultCard,
  PlayerPhrase,
  ChoiceImage,
  ResultStatusContainer,
  ResultStatus,
  PlayAgainButton,
  TriggerButton,
  RulesViewImage,
  CloseButton,
  PopupCont,
  PopupContainer,
} from './styledComponents'

const gameStatusObj = {
  initial: 'INPROGRESS',
  win: 'WIN',
  lose: 'LOSE',
  draw: 'DRAW',
}

const optionsList = ['ROCK', 'PAPER', 'SCISSORS']

class RockPaperScissors extends Component {
  state = {
    score: 0,
    gameStatus: gameStatusObj.initial,
    userChoice: '',
    opponentChoice: '',
  }

  setGameStatus = () => {
    const {userChoice, opponentChoice} = this.state
    console.log(userChoice)
    console.log(opponentChoice)

    if (userChoice === opponentChoice) {
      this.setState({gameStatus: gameStatusObj.draw})
    } else if (
      (userChoice === 'ROCK' && opponentChoice === 'PAPER') ||
      (userChoice === 'PAPER' && opponentChoice === 'SCISSORS') ||
      (userChoice === 'SCISSORS' && opponentChoice === 'ROCK')
    ) {
      this.setState({gameStatus: gameStatusObj.lose})
      this.setState(prevState => ({
        score: prevState.score - 1,
      }))
    } else {
      this.setState({gameStatus: gameStatusObj.win})
      this.setState(prevState => ({
        score: prevState.score + 1,
      }))
    }
  }

  userSelectedOption = id => {
    const randomNum = Math.floor(Math.random() * optionsList.length)
    this.setState(
      {userChoice: id, opponentChoice: optionsList[randomNum]},
      this.setGameStatus,
    )
  }

  renderResultContainer = () => {
    const {userChoice, opponentChoice, gameStatus} = this.state
    const {choicesList} = this.props
    const userChoiceObj = choicesList.filter(obj => obj.id === userChoice)[0]
    const opponentChoiceObj = choicesList.filter(
      obj => obj.id === opponentChoice,
    )[0]
    let result

    // console.log(gameStatus)

    switch (gameStatus) {
      case 'WIN':
        result = 'YOU WON'
        break
      case 'LOSE':
        result = 'YOU LOSE'
        break
      case 'DRAW':
        result = 'IT IS DRAW'
        break
      default:
        result = ''
    }

    const onClickPlayAgain = () => {
      this.setState({
        gameStatus: gameStatusObj.initial,
      })
    }

    return (
      <ResultContainer>
        <ResultCardContainer>
          <ResultCard>
            <PlayerPhrase>YOU</PlayerPhrase>
            <ChoiceImage src={userChoiceObj.imageUrl} alt="your choice" />
          </ResultCard>
          <ResultCard>
            <PlayerPhrase>OPPONENT</PlayerPhrase>
            <ChoiceImage
              src={opponentChoiceObj.imageUrl}
              alt="opponent choice"
            />
          </ResultCard>
        </ResultCardContainer>
        <ResultStatusContainer>
          <ResultStatus>{result}</ResultStatus>
          <PlayAgainButton type="button" onClick={onClickPlayAgain}>
            PLAY AGAIN
          </PlayAgainButton>
        </ResultStatusContainer>
      </ResultContainer>
    )
  }

  render() {
    const {score, gameStatus} = this.state
    const {choicesList} = this.props
    return (
      <AppContainer>
        <ScoreCardContainer>
          <OptionsContainer>
            <Option>
              ROCK <br />
              <br /> PAPER <br />
              <br /> SCISSORS
            </Option>
          </OptionsContainer>
          <ScoreCard>
            <ScorePhrase>Score</ScorePhrase>
            <Score>{score}</Score>
          </ScoreCard>
        </ScoreCardContainer>
        {gameStatus === gameStatusObj.initial ? (
          <UserOptionsContainer>
            {choicesList.map(eachChoice => (
              <GameOptions
                key={eachChoice.id}
                eachChoice={eachChoice}
                onClickUserOption={this.userSelectedOption}
              />
            ))}
          </UserOptionsContainer>
        ) : (
          this.renderResultContainer()
        )}
        <PopupCont>
          <Popup
            modal
            trigger={<TriggerButton type="button">Rules</TriggerButton>}
            closeOnEscape
            window
            position="center"
          >
            {close => (
              <PopupContainer>
                <CloseButton type="button" onClick={() => close()}>
                  <RiCloseLine />
                </CloseButton>
                <RulesViewImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </PopupContainer>
            )}
          </Popup>
        </PopupCont>
      </AppContainer>
    )
  }
}

export default RockPaperScissors
