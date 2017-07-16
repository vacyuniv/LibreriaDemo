var mockedEntries = {

  USER_TABLE: [
    {
      'id': 2,
      'username': 'try2',
      'password':'me2'
    },
    {
      'id': 1,
      'username': 'try',
      'password':'me'
    }
  ],

  AUTHOR_TABLE: [
    {
      'id': 1,
      'name': 'Isaac Asimov',
      'pseudonym': 'Isaac Asimov'
    },
    {
      'id': 2,
      'name': 'Robert A. Heinlein',
      'pseudonym': 'Robert A. Heinlein'
    },
    {
      'id': 3,
      'name': 'Arthur C. Clarke',
      'pseudonym': 'Arthur C. Clarke'
    },
    {
      'id': 4,
      'name': 'Poul Anderson',
      'pseudonym': 'Poul Anderson'
    },
    {
      'id': 5,
      'name': 'Ray Bradbury',
      'pseudonym': 'Ray Bradbury'
    },
    {
      'id': 6,
      'name': 'J. G. Ballard',
      'pseudonym': 'J. G. Ballard'
    },
    {
      'id': 7,
      'name': 'Clifford Simak',
      'pseudonym': 'Clifford D. Simak'
    }
  ],

  BOOK_TABLE: [
    {
      'isbn': '8804519525',
      'title': 'Io, robot',
      'description': 'A lei, un robot è solo un robot. Ma lei non ha lavorato con loro. Lei non li conosce. Loro sono degli addetti alle pulizie, i migliori che abbiamo. Quando la Terra è dominata da un padrone-macchina... quando i robot sono più umani dell\'umanità. La visione indimenticabile, agghiacciante del futuro, da parte di Isaac Asimov - disponibile finalmente nella sua prima edizione in brossura.',
      'imageUrl': 'https://images-na.ssl-images-amazon.com/images/I/41WFM04FSxL._SY344_BO1,204,203,200_.jpg',
      'editor': 'Mondadori',
      'year': 2003,
      'basePrice': 9.90,
      'baseDiscount': 10,
      'authorId': 1
    },
    {
      'isbn': '88-520-3675-X',
      'title': 'Le fontane del Paradiso',
      'description': 'Bellissimo',
      'imageUrl': 'http://www.bibliotecagalattica.com/romanzi/immaginiromanzi/fontane_del_paradiso.jpg',
      'editor': 'Mondadori',
      'year': 1979,
      'basePrice': 8.90,
      'baseDiscount': 12,
      'authorId': 3
    },
    {
      'isbn': '88-04-40304-7',
      'title': 'Abissi di acciaio',
      'description': 'Metropoli e indagini',
      'imageUrl': 'https://images-na.ssl-images-amazon.com/images/I/71LJTc5gfYL.jpg',
      'editor': 'Mondadori',
      'year': 1995,
      'basePrice': 12.90,
      'baseDiscount': 20,
      'authorId': 1
    },
    {
      'isbn': '88-389-1185-1',
      'title': 'Orfani del Cielo',
      'description': 'Un grande classico che ha inaugurato la trama della nave-colonia sperduta alla deriva',
      'imageUrl': 'http://sellerio.it/upload/assets/files/841,it,2142/822-3.jpg',
      'editor': 'Sellerio',
      'year': 1995,
      'basePrice': 20.90,
      'baseDiscount': 50.50,
      'authorId': 2
    },
    {
      'isbn': '9788842900474',
      'title': 'Il mercante delle stelle',
      'description': 'Preso a caso',
      'imageUrl': 'http://image.anobii.com/anobi/image_book.php?item_id=0150f1c10b1b5791ad&time=&type=4',
      'editor': 'Cosmo',
      'year': 1975,
      'basePrice': 12.90,
      'baseDiscount': 20,
      'authorId': 4
    },
    {
      'isbn': '9788807819117',
      'title': 'L\'impero del sole',
      'description': 'A caso, ma conoscendo Ballard sarà qualcosa di catastrofico e sopravvivenza',
      'imageUrl': 'http://www.feltrinellieditore.it/media/copertina/quarta/17/9788807819117_quarta.jpg',
      'editor': 'Feltrinelli',
      'year': 1984,
      'basePrice': 8.90,
      'baseDiscount': 5.75,
      'authorId': 6
    },
    {
      'isbn': '88-429-1243-3',
      'title': 'Anni senza fine',
      'description': 'Un fantastico viaggio nel tempo fino alla fine dell\'umanità, e ai suoi discendenti, i cani.',
      'imageUrl': 'http://www.fantascienza.com/catalogo/imgbank/cover/13174.jpg',
      'editor': 'Editrice Nord',
      'year': 1952,
      'basePrice': 22.90,
      'baseDiscount': 22,
      'authorId': 7
    },
    {
      'isbn': '88-04-32025-7',
      'title': 'Farenheit 451 - gli anni della fenice',
      'description': 'Brucia tutti i libri, a che servono?',
      'imageUrl': 'http://www.catalogovegetti.com/catalogo/Cover/05120.jpg',
      'editor': 'Mondadori',
      'year': 1999,
      'basePrice': 17.90,
      'baseDiscount': 25,
      'authorId': 5
    }
  ]
};

angular.module('databaseManager').constant('MOCK_DB', mockedEntries);
