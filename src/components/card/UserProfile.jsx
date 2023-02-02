import { momentId } from '../../constants/momentID'
import langConfig from '../../config/langConfig.json'
import FallBack from '../../assets/fault.png'

import { BsPerson, BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { Image } from 'antd'
import moment from 'moment'

moment.updateLocale('id', momentId)

const UserProfile = (props) => {
  // Props Destructure
  const { profileDetails } = props
  const { avatar, dateOfBirth, fullName, gender, username, email, bio, phone, address, role } = profileDetails

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
              {role === 0
                ? langConfig.role3
                : role === 1
                  ? langConfig.role2
                  : role === 2
                    ? langConfig.role1
                    : langConfig.role0
              }
            </span>
          </div>

          {/* Bio */}
          <p className="mb-0 text-sm font-light tracking-wide text-center">
            {bio}
          </p>
        </div>

        {/* About */}
        <div className="flex flex-col w-full rounded-md bg-milk dark:bg-alternate items-center justify-center space-y-2 px-5 py-5 duration-300 ease-in-out">
          {/* Header About */}
          <div className="flex flex-row w-full items-center justify-center">
            <div className="flex items-center space-x-2">
              <p className="mb-0 font-medium text-xl tracking-wide">
                {langConfig.profileAbout}
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="">
              <div className="grid md:grid-cols-2 text-sm">
                {/* Fullname */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    {langConfig.profileFullName}
                  </div>
                  <div className="px-4 py-2">{fullName}</div>
                </div>

                {/* Gender */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    {langConfig.profileGender}
                  </div>
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
                  <div className="px-4 py-2 font-semibold">
                    {langConfig.profileBirthday}
                  </div>
                  <div className="px-4 py-2">
                    {moment(dateOfBirth).format('LL')}
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                  {langConfig.profileEmail}
                  </div>
                  <div className="px-4 py-2">
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                  {langConfig.profilePhone}
                  </div>
                  <div className="px-4 py-2">{phone}</div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                  {langConfig.profileAddress}
                  </div>
                  <div className="px-4 py-2">
                    {address}
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
