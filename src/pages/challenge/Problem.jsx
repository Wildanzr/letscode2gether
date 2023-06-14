import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'

import api from '../../api'
import { Navbar as MainNavbar, Footer } from '../../layout'
import { Navbar, SideContent } from '../../components/collaboration'
import Editor from '../../components/editor'
import Runner from '../../components/runner'
import Result from '../../components/result'
import { Bold } from '../../components/other'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import emoji from 'react-easy-emoji'
import Joyride, { STATUS, ACTIONS, EVENTS } from 'react-joyride'

const ChallengeProblemPage = () => {
  // useParams
  const { competeProblemId, competeId } = useParams()

  // Global States
  const { globalState, editorState, globalFunctions } = useGlobal()
  const { colHide, setColHide, setColSideContent, setIsOnlyEditor, isTourNeverShow, setIsTourNeverShow } = globalState
  const { mySwal } = globalFunctions
  const { run } = editorState

  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Collab States
  const { problemStates } = useCollab()
  const { setCompeteProblem, setCompeteMaxPoint, setLanguageList } = problemStates

  // Local States
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [localFirst, setLocalFirst] = useState(false)
  const [from] = useState(new Date())

  // Tour step and scroll lock
  const steps = [
    {
      target: '.rt-problem-title',
      content: (
        <p className="font-ubuntu text-justify">
          Ini merupakan <Bold text="judul" /> dari permasalahan yang sedang
          dikerjakan.
        </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    },
    {
      target: '.rt-problem-challenger',
      content: (
        <p className="font-ubuntu text-justify">
          Username tersebut adalah <Bold text="penantang" /> yang membuat
          permasalahan ini.
        </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    },
    {
      target: '.rt-problem-description',
      content: (
        <div className="flex flex-col font-ubuntu text-justify">
          <p>
            Bagian ini merupakan <Bold text="detail permasalahan" />. Berikut tips penyelesaian
            masalah:
          </p>
          <ol className="list-decimal list-inside">
            <li>Pahami permasalahan {emoji('🧐')}</li>
            <li>Temukan solusi penyelesaian {emoji('🤫')}</li>
            <li>Tulis kode program {emoji('👨‍💻')}</li>
            <li>Uji solusi {emoji('🧪')}</li>
            <li>Kumpulkan kode program {emoji('📝')}</li>
          </ol>
        </div>
      ),
      placement: 'right-start',
      disableBeacon: true
    },
    {
      target: '.rt-navigation',
      content: (
        <p className="font-ubuntu text-justify">
          Bagian ini merupakan navigasi permasalahan yang terdiri dari{' '}
          <Bold text="Permasalahan" />, <Bold text="Pengumpulan" />, dan{' '}
          <Bold text="Papan Peringkat" />.
        </p>
      ),
      placement: 'right-start',
      disableBeacon: true
    },
    {
      target: '.rt-nav-problem',
      content: (
        <p className="font-ubuntu text-justify">
          Menu ini digunakan untuk melihat <Bold text="detail" /> permasalahan.
        </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    },
    {
      target: '.rt-nav-submission',
      content: (
        <p className="font-ubuntu text-justify">
          Menu ini digunakan untuk melihat <Bold text="riwayat pengumpulan" />{' '}
          kode program.
        </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    },
    {
      target: '.rt-nav-leaderboard',
      content: (
        <p className="font-ubuntu text-justify">
          Menu ini digunakan untuk melihat <Bold text="papan peringkat" /> dan
          siapa saja yang mengerjakan permasalahan ini.
          <br/>
          <br/>
          <Bold text="Pro tips" />:
          <br/>
          Menu yang ditekan dua kali akan disembunyikan dan memperlebar ukuran teks editor.
        </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    },
    // {
    //   target: '.rt-collab-info',
    //   content: (
    //     <div className="flex flex-col font-ubuntu text-justify">
    //       <p>
    //         Bagian ini merupakan informasi mengenai ruang kolaborasi. Dalam model
    //         pembelajaran pair programming terdapat 2 peran yaitu:
    //       </p>
    //       <ul className="list-disc list-inside">
    //         <li>
    //           <Bold text="Driver" /> bertugas untuk
    //         mendesain algoritma dan mengimplementasikan solusi.
    //         </li>
    //         <li>
    //           <Bold text="Navigator" /> memberikan saran dan meninjau kode program yang ditulis.
    //         </li>
    //       </ul>
    //       <p>
    //       Di ruang kolaborasi ini, keduanya dapat menulis dan membagikan kode program secara bersamaan.
    //       </p>
    //     </div>
    //   ),
    //   placement: 'bottom',
    //   disableBeacon: true
    // },
    // {
    //   target: '.rt-collab-field',
    //   content: (
    //       <p className='font-ubuntu text-justify'>
    //         Bagian ini merupakan field untuk <Bold text="ID Ruangan" /> kolaborasi.
    //         Untuk bergabung pada ruang
    //         kolaborasi, masukkan ID ruangan yang valid.
    //       </p>
    //   ),
    //   placement: 'bottom',
    //   disableBeacon: true
    // },
    // {
    //   target: '.rt-collab-button',
    //   content: (
    //       <p className='font-ubuntu text-justify'>
    //         Tekan tombol <Bold text="&quot;Gabung&quot;" />
    //         untuk bergabung pada ruang kolaborasi, atau tekan tombol{' '}
    //         <Bold text="&quot;Keluar&quot;" /> untuk
    //         meninggalkan ruang kolaborasi.
    //       </p>
    //   ),
    //   placement: 'right',
    //   disableBeacon: true
    // },
    // {
    //   target: '.rt-meet',
    //   content: (
    //       <p className='font-ubuntu text-justify'>
    //         Tekan tombol ini untuk membuka <Bold text="panggilan secara daring" />{' '} {emoji('📞👥')}.

    //         Panggilan ini seperti zoom atau google meet untuk berkomunikasi dengan partnermu.
    //       </p>
    //   ),
    //   placement: 'bottom',
    //   disableBeacon: true
    // },
    {
      target: '.rt-language',
      content: (
          <p className='font-ubuntu text-justify'>
            Menu dropdown ini digunakan untuk <Bold text="memilih bahasa pemrograman" />.
          </p>
      ),
      placement: 'top',
      disableBeacon: true
    },
    {
      target: '.rt-theme',
      content: (
        <p className='font-ubuntu text-justify'>
            Menu dropdown ini digunakan untuk <Bold text="mengganti tema teks editor" />. Banyak tema
            yang dapat kamu gunakan sesuai dengan preferensimu.
          </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    },
    {
      target: '.rt-editor',
      content: (
          <p className='font-ubuntu text-justify'>
            Bagian ini merupakan <Bold text="teks editor" />{' '} yang digunakan untuk <Bold text="berkolaborasi dalam pair programming" />. Melalui teks editor ini
            kamu dapat menulis dan membagikan kodemu secara langsung dan bersamaan tanpa ribet instal aplikasi lain.
          </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    },
    {
      target: '.rt-custom-input',
      content: (
          <p className='font-ubuntu text-justify'>
            Bagian ini digunakan untuk <Bold text="kustomisasi input" /> yang akan dijalankan kodemu.
          </p>
      ),
      placement: 'top',
      disableBeacon: true
    },
    {
      target: '.rt-code-run',
      content: (
          <p className='font-ubuntu text-justify'>
            Tekan tombol ini untuk <Bold text="menjalankan" /> kodemu dan <Bold text="menampilkan hasil uji cobanya" />.
          </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    },
    {
      target: '.rt-code-submit',
      content: (
          <p className='font-ubuntu text-justify'>
            Tekan tombol ini untuk <Bold text="mengumpulkan kodemu" /> dan <Bold text="hasil penilaian solusi masalah" />.
          </p>
      ),
      placement: 'right',
      disableBeacon: true
    }
  ]

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data

    const handleNext = (pos) => {
      return (action === ACTIONS.NEXT || action === ACTIONS.CLOSE) && index === pos && type === EVENTS.STEP_AFTER
    }

    const handlePrev = (pos) => {
      return (action === ACTIONS.PREV || action === ACTIONS.CLOSE) && index === pos && type === EVENTS.STEP_AFTER
    }

    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    // Close tour
    if (finishedStatuses.includes(status)) {
      setIsTourOpen(false)
    }

    // Open Problem
    if (handleNext(3) || handlePrev(5)) {
      setColHide(true)
      setColSideContent('problems')
    }

    // Open submission
    if (handleNext(4) || handlePrev(6)) {
      setColHide(true)
      setColSideContent('submissions')
    }

    // Open leaderboard
    if (handleNext(5) || handlePrev(7)) {
      setColHide(true)
      setColSideContent('leaderboard')
    }

    // Hide leaderboard
    if (handleNext(6) || handlePrev(8)) {
      setIsTourOpen(false)
      setColHide(false)

      setTimeout(() => {
        setIsTourOpen(true)
      }, 350)
    }
  }

  // Never show tour again
  const neverShowTour = () => {
    Cookies.set('isTourNeverShow', true)
    setIsTourNeverShow(true)

    // Close Swal
    mySwal.close()
  }

  // Swal footer
  const SwalFooter = () => {
    return (
      <a className='text-hard hover:text-hard text-base font-semibold' onClick={() => neverShowTour()}>Jangan tampilkan lagi.</a>
    )
  }

  // Show mySwal
  const showTourSwal = () => {
    mySwal.fire({
      title: 'Ingin melihat tour LetsCode?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, saya ingin melihatnya',
      cancelButtonText: 'Tidak perlu',
      reverseButtons: false,
      footer: SwalFooter()
    }).then((result) => {
      if (result.isConfirmed) {
        setColHide(true)
        setColSideContent('problems')

        setTimeout(() => {
          setIsTourOpen(true)
        }, 350)
      }
    })
  }

  // Get compete problem detail
  const getCompeteProblemDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/competes/cp/${competeProblemId}`, config)
      // console.log(data)

      const { competeProblem } = data.data
      const { problemId, maxPoint } = competeProblem
      setCompeteProblem(problemId)
      setCompeteMaxPoint(maxPoint)
    } catch (error) {
      console.log(error)
    }
  }

  // Get compete allowed language
  const getCompeteAllowedLanguage = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/competes/${competeId}`, config)
      // console.log(data)

      // Set language list
      const { languageAllowed } = data.data.compete
      setLanguageList(languageAllowed)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get compete problem detail
  useEffect(() => {
    setIsOnlyEditor(false)
    getCompeteAllowedLanguage()
    getCompeteProblemDetail()
  }, [])

  // Open tour after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setLocalFirst(true)
      !isTourNeverShow && showTourSwal()
    }, 2000)
  }, [])

  // Monitor isTourNeverShow
  useEffect(() => {
    if (localFirst) {
      !isTourNeverShow && showTourSwal()
    }
  }, [isTourNeverShow])

  // UseEffect when leaving page
  useEffect(() => {
    return () => {
      if (user) travelLog(`Visiting challenge problem page ->${competeProblemId}`, from, new Date())
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <MainNavbar>
      <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          run={isTourOpen}
          continuous={true}
          hideCloseButton={true}
          locale={{
            back: 'Kembali',
            close: 'Tutup',
            last: 'Selesai',
            next: 'Lanjut',
            skip: 'Lewati'
          }}
          scrollToFirstStep
          showProgress
          showSkipButton
          // style next button color to blue
          styles={{
            options: {
              primaryColor: '#3B82F6',
              textColor: '#1F2937',
              width: 400,
              zIndex: 1000
            }
          }}
        />
        <main className="flex flex-col lg:flex-row w-full h-full items-center lg:items-start justify-start bg-milk dark:bg-alternate duration-300 ease-in-out">
          <Navbar />
          <SideContent />
          <div
            className={`flex flex-col ${
              colHide ? 'w-full lg:w-1/2 h-0 lg:h-full' : 'w-full h-full'
            } justify-between overflow-auto transition-all ease-in-out duration-500 space-y-6`}
          >
            <div className="flex flex-col w-full h-full items-start justify-start pt-2 pb-10 px-2 space-y-6 bg-milk dark:bg-alternate duration-300 ease-in-out">
              {/* <RoomInfo /> */}
              <Editor />
              <Runner />
              {run && <Result />}
            </div>
          </div>
        </main>
      </MainNavbar>
      <Footer />
    </div>
  )
}

export default ChallengeProblemPage
