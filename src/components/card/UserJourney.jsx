import B1 from '../../assets/badge1.svg'
import B2 from '../../assets/badge2.svg'
import B3 from '../../assets/badge3.svg'
import B4 from '../../assets/badge4.svg'
import B5 from '../../assets/badge5.svg'
import B6 from '../../assets/badge6.svg'

const UserJourney = (props) => {
  // Props Destructure
  const { journeyDetails } = props
  const { progress, point } = journeyDetails

  // Local States
  const badges = [B1, B2, B3, B4, B5, B6]

  // Render badges
  const renderBadges = (current) => {
    return (
      <div className="flex flex-row space-x-1">
        {badges.map((badge, index) => (
          <img key={index} src={badge} className={`w-14 ${index < current ? 'grayscale-0' : 'grayscale'}`} />
        ))}
      </div>
    )
  }

  // Define badge
  const defineBadge = (point) => {
    if (point === 0) {
      return (
        <p className="mb-0 text-2xl font-ubuntu font-bold text-success">-</p>
      )
    } else if (point < 500) {
      return renderBadges(1)
    } else if (point < 1000) {
      return renderBadges(2)
    } else if (point < 1500) {
      return renderBadges(3)
    } else if (point < 2000) {
      return renderBadges(4)
    } else if (point < 2500) {
      return renderBadges(5)
    } else {
      return renderBadges(6)
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center font-ubuntu py-5 px-5 text-main dark:text-snow duration-300 ease-in-out">
      <div className="flex flex-col w-full rounded-md bg-milk dark:bg-alternate items-center justify-center space-y-2 px-5 py-5 duration-300 ease-in-out">
        <div className="flex flex-col w-full space-y-2">
          <div className="flex flex-col space-y-2 items-center">
            <p className="mb-0 text-lg font-ubuntu font-bold">
              Overral progress:
            </p>
            <p className="mb-0 text-4xl font-ubuntu font-bold text-success">
              {progress}%
            </p>
          </div>

          <div className="flex flex-col space-y-2 items-center">
            <p className="mb-0 text-lg font-ubuntu font-bold">
              Badges:
            </p>
            {defineBadge(point)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserJourney
