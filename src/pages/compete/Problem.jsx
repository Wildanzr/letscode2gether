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

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import Tour from 'reactour'

const CompeteProblemPage = () => {
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

  const steps = [
    {
      selector: '.rt-problem-title',
      content: () => (
        <div className="font-ubuntu">
          <p>
            Bagian ini merupakan <span className="font-bold">judul</span> dari
            permasalahan yang sedang dikerjakan.
          </p>
        </div>
      ),
      action: (node) => {
        setColHide(true)
        setColSideContent('problems')
        node.focus()
      }
    },
    {
      selector: '.rt-problem-challenger',
      content: () => (
        <div className="font-ubuntu">
          <p>
            Nama tersebut merupakan <span className="font-bold">penantang</span>{' '}
            yang membuat permasalahan.
          </p>
        </div>
      ),
      action: (node) => {
        setColHide(true)
        setColSideContent('problems')
        node.focus()
      }
    },
    {
      selector: '.rt-problem-description',
      content: () => (
        <div className="font-ubuntu">
          <p>
            Bagian ini merupakan detail permasalahan yang terdiri dari{' '}
            <span className="font-bold">deskripsi</span>,{' '}
            <span className="font-bold">batasan</span>,{' '}
            <span className="font-bold">format masukan</span>,{' '}
            <span className="font-bold">format keluaran</span> dan{' '}
            <span className="font-bold">contoh kasus</span> dari permasalahan yang
            sedang dikerjakan.
          </p>
        </div>
      ),
      action: (node) => {
        setColHide(true)
        setColSideContent('problems')
        node.focus()
      }
    },
    {
      selector: '.rt-navigation',
      content: () => (
        <div className="font-ubuntu">
          <p>
            Bagian ini merupakan navigasi permasalahan yang terdiri dari informasi{' '}
            <span className='font-bold'>permasalahan</span>, <span className='font-bold'>pengumpulan</span>, dan <span className='font-bold'>papan peringkat</span>. Tekan salah satu
            tombol untuk melihat detailnya, jika tombol yang aktif ditekan lagi,
            maka detail informasi akan disembunyikan. Kamu bisa mencobanya dengan
            menekan tombol <span className="font-bold">Permasalahan</span>{' '}
            sekarang.
          </p>
        </div>
      ),
      action: (node) => {
        node.focus()
      }
    },
    {
      selector: '.rt-nav-problem',
      content: () => (
        <div className="font-ubuntu">
          <p>Tombol ini digunakan untuk melihat detail permasalahan.</p>
        </div>
      ),
      action: (node) => {
        setColHide(true)
        setColSideContent('problems')
        node.focus()
      }
    },
    {
      selector: '.rt-nav-submission',
      content: () => (
        <div className="font-ubuntu">
          <p>Tombol ini digunakan untuk melihat detail pengumpulan.</p>
        </div>
      ),
      action: (node) => {
        setColHide(true)
        setColSideContent('submissions')
        node.focus()
      }
    },
    {
      selector: '.rt-nav-leaderboard',
      content: () => (
        <div className="font-ubuntu">
          <p>Tombol ini digunakan untuk melihat detail papan peringkat.</p>
        </div>
      ),
      action: (node) => {
        setColHide(true)
        setColSideContent('leaderboard')
        setTimeout(() => {
          node.focus()
        }, 1000)
      }
    },
    {
      selector: '.rt-language',
      content: () => (
        <div className="font-ubuntu">
          <p>Menu dropdown ini digunakan untuk mengganti bahasa pemrograman. Pilihlah salah satu bahasa pemrograman yang kamu gunakan untuk mengerjakan permasalahan.</p>
        </div>
      ),
      action: (node) => {
        node.focus()
      }
    },
    {
      selector: '.rt-theme',
      content: () => (
        <div className="font-ubuntu">
          <p>Menu dropdown ini digunakan untuk mengganti tema editor. Banyak tema yang dapat kamu gunakan sesuai dengan preferensimu.</p>
        </div>
      ),
      action: (node) => {
        node.focus()
      }
    },
    {
      selector: '.rt-editor',
      content: () => (
        <div className="font-ubuntu">
          <p>Bagian ini merupakan text editor untuk menuliskan kode program kamu.</p>
        </div>
      ),
      action: (node) => {
        node.focus()
      }
    },
    {
      selector: '.rt-custom-input',
      content: () => (
        <div className="font-ubuntu">
          <p>Bagian ini digunakan untuk memasukkan input yang akan diberikan ke program secara kustom.</p>
        </div>
      ),
      action: (node) => {
        // const section = document.querySelector('.rt-custom-input')
        // section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        node.focus()
      },
      position: 'bottom'
    },
    {
      selector: '.rt-code-run',
      content: () => (
        <div className="font-ubuntu">
          <p>Tombol ini digunakan untuk menjalankan program dan menampilkan hasilnya.</p>
        </div>
      ),
      action: (node) => {
        node.focus()
      },
      position: 'bottom'
    },
    {
      selector: '.rt-code-submit',
      content: () => (
        <div className="font-ubuntu">
          <p>Tombol ini digunakan untuk mengumpulkan program dan akan menilai dengan uji kasus yang telah disediakan.</p>
        </div>
      ),
      action: (node) => {
        node.focus()
      },
      position: 'bottom'
    }
  ]

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
      <a className='text-easy text-base font-semibold' onClick={() => neverShowTour()}>Jangan tampilkan lagi.</a>
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
        setIsTourOpen(true)
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

  // Travel log
  useEffect(() => {
    if (user) {
      travelLog(`Visiting compete problem page ->${competeProblemId}`)
    }
  }, [user])

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

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <MainNavbar>
        <main className="flex flex-col lg:flex-row w-full h-full items-center lg:items-start justify-start bg-milk dark:bg-alternate duration-300 ease-in-out">
          <Navbar />
          <SideContent />
          <div
            className={`flex flex-col ${
              colHide ? 'w-full lg:w-1/2 h-0 lg:h-full' : 'w-full h-full'
            } justify-between overflow-auto transition-all ease-in-out duration-500 space-y-6`}
          >
            <div className="flex flex-col w-full h-full items-start justify-start pt-5 pb-10 px-2 space-y-6 bg-milk dark:bg-alternate duration-300 ease-in-out">
              {/* <RoomInfo /> */}
              <Editor />
              <Runner />
              {run && <Result />}
            </div>
          </div>
        </main>
      </MainNavbar>
      <Footer />
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        rounded={5}
        scrollSmooth
        scrollDuration={500}
        scrollOffset={-100}
        accentColor='#3B82F6'
        onRequestClose={() => setIsTourOpen(false)}
        badgeContent={(curr, tot) => `${curr} dari ${tot}`}
        padding={{
          mask: 14,
          popover: [5, 10],
          wrapper: 20
        }}
      />
    </div>
  )
}

export default CompeteProblemPage
