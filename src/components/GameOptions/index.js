import {
  GameOptionsContainer,
  GameOptionButton,
  GameOptionImage,
} from './styledComponents'

const GameOptions = props => {
  const {eachChoice, onClickUserOption} = props
  const {id, imageUrl} = eachChoice

  const onClickOption = () => {
    onClickUserOption(id)
  }

  return (
    <GameOptionsContainer>
      <GameOptionButton
        type="button"
        onClick={onClickOption}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <GameOptionImage src={imageUrl} alt={id} />
      </GameOptionButton>
    </GameOptionsContainer>
  )
}

export default GameOptions
