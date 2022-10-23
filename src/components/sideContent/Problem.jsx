import ProblemSpecification from './ProblemSpecification'
import SampleCase from './SampleCase'

const Problem = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="flex flex-col w-full p-2">
        <h4 className="mb-0 text-lg lg:text-2xl font-semibold text-white">
          Program Mengeja Angka 1 Hingga 100
        </h4>
        <p className="mb-0 text-sm font-thin text-white">
          Challenger: <span className="font-medium text-easy">Mr. John Doe</span>
        </p>
      </div>

      <div className="flex flex-col w-full p-2">
        <p className="text-sm text-justify text-white mb-0">
          Andri memiliki seorang adik berumur 4 tahun. Pada usia tersebut
          adiknya mulai belajar untuk mengeja sebuah kata. Melihat hal itu Andri
          ingin membantu adiknya untuk belajar mengeja, Andri menggunakan
          nominal uang sebagai perangkat belajar agar adiknya lebih semangat
          lagi untuk belajar mengeja. Supaya tau bahwa apa yang dieja oleh
          adiknya benar, Andri ingin ada sebuah program yang ketika kita
          menginputkan beberapa angka, maka secara otomatis program akan
          menampilkan ejaan dari angka tersebut. Bantulah Andri membuat program
          tersebut !!
        </p>
      </div>
      <div className="flex flex-col w-full bg-gray-600 p-2">
        <ProblemSpecification title="Constraints" content="0 <= angka <= 100" />
      </div>

      <div className="flex flex-col w-full bg-gray-600 p-2">
        <ProblemSpecification title="Input Format" content="angka" />
      </div>

      <div className="flex flex-col w-full bg-gray-600 p-2">
        <ProblemSpecification title="Output Format" content="ejaan angka" />
      </div>

      <SampleCase title="Sample Case 1" input="13" output="Tiga Belas" />
      <SampleCase title="Sample Case 2" input="45" output="Empat Puluh Lima" />
    </div>
  )
}

export default Problem
