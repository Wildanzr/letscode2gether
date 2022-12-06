import { momentId } from '../../constants/momentID'
import FallBack from '../../assets/fault.png'

import { BsPerson, BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { Image } from 'antd'
import moment from 'moment'

moment.updateLocale('id', momentId)

const UserProfile = (props) => {
  // Props Destructure
  const { profileDetails } = props
  const { avatar, dateOfBirth, fullName, gender, username } = profileDetails

  return (
    <div className="flex flex-col w-full items-center justify-center font-ubuntu py-5 px-5 text-main dark:text-snow duration-300 ease-in-out">
      <div className="flex flex-col w-full items-center justify-center space-y-4">
        {/* Picture */}
        <div className="flex w-60 h-60 items-center justify-center">
          <Image src={avatar} className="rounded-full" fallback={FallBack} />
        </div>

        <div className="flex flex-col space-y-2 items-center justify-center pb-5">
          {/* Username */}
          <p className="mb-0 text-base font-medium tracking-wide">{username}</p>

          {/* Role */}
          <div className="flex flex-row space-x-2">
            <BsPerson className="h-5 w-5 fill-main dark:fill-snow duration-300 ease-in-out" />
            <span className="mb-0 font-light tracking-wider text-sm">
              Student
            </span>
          </div>

          {/* Bio */}
          <p className="mb-0 text-sm font-light tracking-wide text-center">
            I am a full stack developer with over 8 years of experience in web
            and software development. I specialize in front-end development,
            utilizing HTML, CSS, JavaScript, JQuery, React, and other frameworks
            to create dynamic web pages and applications.
          </p>
        </div>

        {/* About */}
        <div className="flex flex-col w-full rounded-md bg-milk dark:bg-alternate items-start justify-start space-y-2 px-5 py-5 duration-300 ease-in-out">
          {/* Header About */}
          <div className="flex flex-row w-full items-center justify-center">
            <div className="flex items-center space-x-2">
              <p className="mb-0 font-medium text-xl tracking-wide">About</p>
            </div>
          </div>

          <div className="flex">
            <div className="">
              <div className="grid md:grid-cols-2 text-sm">
                {/* Fullname */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Full Name</div>
                  <div className="px-4 py-2">{fullName}</div>
                </div>

                {/* Gender */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Gender</div>
                  <div className="px-4 py-2">
                    {gender
                      ? (
                      <BsGenderMale className="h-5 w-5 fill-main dark:fill-snow duration-300 ease-in-out" />
                        )
                      : (
                      <BsGenderFemale className="h-5 w-5 fill-main dark:fill-snow duration-300 ease-in-out" />
                        )}
                  </div>
                </div>

                {/* Birthday */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Birthday</div>
                  <div className="px-4 py-2">
                    {moment(dateOfBirth).format('LL')}
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email.</div>
                  <div className="px-4 py-2">
                    <a href="mailto:jane@example.com">jane@example.com</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Phone</div>
                  <div className="px-4 py-2">081335488360</div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Address</div>
                  <div className="px-4 py-2">
                    Arlington Heights, IL, Illinois
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
