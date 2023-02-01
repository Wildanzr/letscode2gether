export const steps = [
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
      node.focus()
    }
  },
  {
    selector: '.rt-navigation',
    content: () => (
      <div className="font-ubuntu">
        <p>
          Bagian ini merupakan navigasi permasalahan yang terdiri dari informasi
          permasalahan, pengumpulan, dan papan peringkat. Tekan salah satu
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
      node.focus()
    }
  },
  {
    selector: '.rt-collab-info',
    content: () => (
      <div className="font-ubuntu">
        <p>
          Bagian ini merupakan informasi mengenai ruang kolaborasi yang terdiri
          dari <span className="font-bold">driver</span>,{' '}
          <span className="font-bold">navigator</span>,{' '}
          <span className="font-bold">partisipan</span>, dan{' '}
          <span className="font-bold">ID ruangan</span>. Dalam model
          pembelajaran pair programming,{' '}
          <span className="font-bold">driver</span> bertanggung jawab menulis
          kode sesuai arahan dari navigator, sedangkan{' '}
          <span className="font-bold">navigator</span> yang memimpin diskusi dan
          bertanggung jawab atas kualitas kode dan desain solusi. Keduanya
          bekerja sama untuk mencapai solusi terbaik dalam penyelesaian masalah.
        </p>
      </div>
    ),
    action: (node) => {
      node.focus()
    }
  },
  {
    selector: '.rt-collab-field',
    content: () => (
      <div className="font-ubuntu">
        <p>Bagian ini dapat diartikan sebagai gerbang untuk bergabung atau meninggalkan ruang kolaborasi. Untuk bergabung pada ruang kolaborasi, masukkan ID ruangan yang valid. ID ruangan hanya terdiri dari 5 karakter.</p>
      </div>
    ),
    action: (node) => {
      node.focus()
    }
  },
  {
    selector: '.rt-collab-button',
    content: () => (
      <div className="font-ubuntu">
        <p>Tekan tombol <span className="font-bold">&quot;Gabung&quot;</span> untuk bergabung pada ruang kolaborasi. Tekan tombol <span className="font-bold">&quot;Keluar&quot;</span> untuk meninggalkan ruang kolaborasi.</p>
      </div>
    ),
    action: (node) => {
      node.focus()
    }
  },
  {
    selector: '.rt-meet',
    content: () => (
      <div className="font-ubuntu">
        <p>Tombol ini digunakan untuk membuka komunikasi melalui video conference.</p>
      </div>
    ),
    action: (node) => {
      node.focus()
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
        <p>Bagian ini merupakan text editor. Dengan text editor ini kamu dapat berkolaborasi bersama temanmu melalui ID ruangan yang sama.</p>
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
      const section = document.querySelector('.rt-custom-input')
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
