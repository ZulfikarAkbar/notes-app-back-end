# **Kriteria system:**

## **Kriteria 1 - Web Server dapat menyimpan catatan** 
1. Struktur dari objek catatan yang perlu disimpan oleh server:
	{
		id: string,
		title: string,,
		createdAt: string,
		updatedAt: string,
		tags: array of string,
		body: string,
	},

2. Agar web server dapat **menyimpan catatan** melalui aplikasi client, web server harus menyediakan route dengan **path ‘/notes’ dan method POST**. 


3. Dalam menyimpan atau menambahkan notes, client akan mengirimkan permintaan ke path dan method tersebut dengan membawa data JSON berikut pada request body:
	{
	    "title": "Judul Catatan",
	    "tags": ["Tag 1", "Tag 2"],
	    "body": "Konten catatan"
	}
Properti id, createdAt, dan updatedAt (server-side)

4. Jika **permintaan client berhasil** dilakukan, respons dari server harus memiliki **status code 201** (created) dan mengembalikan data dalam bentuk JSON dengan format berikut:
	{
	    "status": "success",
	    "message": "Catatan berhasil ditambahkan",
	    "data": {
	      "noteId": "V09YExygSUYogwWJ"
	    }
	}
Properti noteId diambil dari properti id

5. Bila **permintaan gagal** dilakukan, berikan **status code 500** dan kembalikan dengan data JSON dengan format berikut:
	{
	    "status": "error",
	    "message": "Catatan gagal untuk ditambahkan"
	}

## **Kriteria 2 - Web Server dapat menampilkan catatan**
Kriteria ini mengharuskan web server untuk mengirimkan seluruh atau secara spesifik data notes yang disimpan.

1. Ketika client melakukan permintaan pada path **‘/notes’** dengan method **‘GET’**, maka server harus mengembalikan **status code 200** (ok) serta seluruh data notes dalam bentuk array menggunakan JSON. Contohnya seperti ini:
    {
      "status": "success",
      "data": {
        "notes": [
          {
            "id":"notes-V1StGXR8_Z5jdHi6B-myT",
            "title":"Catatan 1",
            "createdAt":"2020-12-23T23:00:09.686Z",
            "updatedAt":"2020-12-23T23:00:09.686Z",
            "tags":[
              "Tag 1",
              "Tag 2"
            ],
            "body":"Isi dari catatan 1"
          },
          {
            "id":"notes-V1StGXR8_98apmLk3mm1",
            "title":"Catatan 2",
            "createdAt":"2020-12-23T23:00:09.686Z",
            "updatedAt":"2020-12-23T23:00:09.686Z",
            "tags":[
              "Tag 1",
              "Tag 2"
            ],
            "body":"Isi dari catatan 2"
          }
        ]
      }
    }

2. Jika belum ada catatan satu pun pada array, server bisa mengembalikan data notes dengan nilai array kosong seperti ini:
    {
      "status": "success",
      "data": {
        "notes": []
      }
    }

3. Selain itu, client juga bisa melakukan **permintaan untuk mendapatkan catatan secara spesifik** menggunakan id melalui path **‘/notes/{id}’** dengan method **‘GET’**. Server harus mengembalikan **status code 200** (ok) serta nilai satu objek catatan dalam bentuk JSON seperti berikut:
    {
      "status": "success",
      "data": {
        "note": {
          "id":"notes-V1StGXR8_Z5jdHi6B-myT",
          "title":"Catatan 1",
          "createdAt":"2020-12-23T23:00:09.686Z",
          "updatedAt":"2020-12-23T23:00:09.686Z",
          "tags":[
            "Tag 1",
            "Tag 2"
          ],
          "body":"Isi dari catatan 1"
        }
      }
    }

4. Bila client melampirkan **id catatan yang tidak ditemukan**, server harus merespons dengan **status code 404**, dan data dalam bentuk JSON seperti ini:
    {
      "status": "fail",
      "message": "Catatan tidak ditemukan"
    }

## **Kriteria 3 - Web Server dapat mengubah catatan**
1. Ketika client meminta **perubahan catatan**, ia akan membuat permintaan ke path **‘/notes/{id}’**, menggunakan method **‘PUT’**, serta membawa data JSON pada body request yang merupakan data catatan terbaru.
    {
      "title":"Judul Catatan Revisi",
      "tags":[
        "Tag 1",
        "Tag 2"
      ],
      "body":"Konten catatan"
    }

2. Jika **perubahan data berhasil** dilakukan, server harus menanggapi dengan **status code 200** (ok) dan membawa data JSON objek berikut pada body respons.
    {
      "status": "success",
      "message": "Catatan berhasil diperbaharui"
    }

3. Perubahan data catatan harus disimpan ke catatan yang sesuai dengan id yang digunakan pada path parameter. Bila **id catatan tidak ditemukan**, maka server harus merespons dengan **status code 404** (not found) dan data JSON seperti ini:
    {
      "status": "fail",
      "message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
    }

## **Kriteria 4 - Web Server dapat menghapus catatan**
1. Kriteria terakhir adalah web server harus bisa menghapus catatan. Untuk menghapus catatan, client akan membuat permintaan pada path **‘/notes/{id}’** dengan method **‘DELETE’**. Ketika permintaan tersebut **berhasil**, maka server harus mengembalikan **status code 200** (ok) serta data JSON berikut:
    {
      "status": "success",
      "message": "Catatan berhasil dihapus"
    }

2. Catatan yang dihapus harus sesuai dengan id catatan yang digunakan client pada path parameter. Bila **id catatan tidak ditemukan**, maka server harus mengembalikan respons dengan **status code 404** dan membawa data JSON berikut:
    {
      "status": "fail",
      "message": "Catatan gagal dihapus. Id catatan tidak ditemukan"
    }