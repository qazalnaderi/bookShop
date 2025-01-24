import book_1 from './01.jpg'
import book_2 from './02.jpg'
import book_3 from './03.jpg'
import book_4 from './04.jpg'
import book_5 from './05.jpg'
import book_6 from './06.jpg'
import book_7 from './07.jpg'
import book_8 from './08.jpg'
import book_9 from './09.jpg'
import book_10 from './10.jpg'
import book_11 from './11.jpg'
import book_12 from './12.jpg'
import book_13 from './13.jpg'
import book_14 from './14.jpg'
import book_15 from './15.jpg'
import book_16 from './16.jpg'
import book_17 from './17.jpg'
import book_18 from './18.jpg'
import book_19 from './19.jpg'
import book_20 from './20.jpg'
import book_21 from './21.jpg'
import book_22 from './22.jpg'
import book_23 from './23.jpg'
import book_25 from './25.jpg'
import logo from './logo.png'
import bag from './bag40.png'
import search from './search40.png'
import back from './back_7.png'
import genre_1 from './romance.png'
import genre_2 from './classic.png'
import genre_3 from './mystery.png'
import genre_4 from './self_help.png'
import genre_5 from './historical.png'
import add from './add.png'
import remove from './remove.png'
import telegram from './telegram.png'
import twitter from './twitter.png'
import facebook from './facebook.png'
import appstore from './photo_2024-12-26_16-03-44.jpg'
import GooglePlayStore from './photo_2024-12-26_16-03-01.jpg'
import cross from './cross-40 (2).png'



export const assets = {
    GooglePlayStore,
    cross,
    appstore,
    facebook,
    twitter,
    telegram,
    logo,
    bag,
    back,
    add,
    remove,
    genre_1,
    genre_2,
    genre_3,
    genre_4,
    genre_5,
    search,
    book_1,
    book_2,
    book_3,
    book_4,
    book_5,
    book_6,
    book_7,
    book_8,
    book_9,
    book_10,
    book_11,
    book_12,
    book_13,
    book_14,
    book_15,
    book_16,
    book_17,
    book_18,
    book_19,
    book_20,
    book_21,
    book_22,
    book_23,
    book_25,
}

export const genre_list = [
    {
        genre_name: "Romance",
        genre_img: assets.genre_1
    },
    {
        genre_name: "Classic Literature",
        genre_img: assets.genre_2
    },
    {
        genre_name: "Mystery",
        genre_img: assets.genre_3
    },
    {
        genre_name: "Self-Help",
        genre_img: assets.genre_4
    },
    {
        genre_name: "Historical",
        genre_img: assets.genre_5
    },
];

export const book_list = [
    {
        _id: "1",
        name: "Hold Me Tight",
        writer: "Sue Johnson",
        image: book_1,
        price: 115,
        category: "Romance",
        description: "The book 'Hold Me Tight' with the subname 'Seven Conversations for a Lifetime of Love' by Sue Johnson is a comprehensive guide to improving and building a secure and beautiful relationship. Sue Johnson, a prominent British psychologist, has helped thousands of couples worldwide improve their relationships and achieve peace and happiness through this book."
    },
    {
        _id: "2",
        name: "It Didn't Start With You",
        writer: "Mark Wolynn",
        image: book_2,
        price: 30,
        category: "Self-Help",
        description: "The e-book 'It Didn't Start With You' written by Mark Wolynn, translated by Malika Shayesteh and Shabnam Darvish, is published by Melikan. This book examines the role of familial traumas and psychological damages in shaping personalities and behaviors and explains how to break the cycle of intergenerational harm."
    },
    {
        _id: "3",
        name: "The Body Keeps the Score",
        writer: "Bessel van der Kolk",
        image: book_3,
        price: 110,
        category: "Self-Help",
        description: "The book 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma' by Bessel van der Kolk, translated by Akbar Darvishi, has been published by Melikan."
    },
    {
        _id: "4",
        name: "365 Days Without You",
        writer: "Akira",
        image: book_4,
        price: 80,
        category: "Romance",
        description: "The book '365 Days Without You' contains short poems by Akira, a Canadian author. This book begins with a romantic breakup and showcases the ups and downs experienced by the author during this period. Every day, the author penned a short poem to express their distressing emotions."
    },
    {
        _id: "5",
        name: "Five Feet Apart",
        writer: "Rachael Lippincott",
        image: book_5,
        price: 70,
        category: "Romance",
        description: "'Five Feet Apart' is a romantic novel for teenagers by Rachael Lippincott, based on a screenplay by Mikki Daughtry and Tobias Iaconis. The story revolves around two teens, Stella Grant and Will Newman, both dealing with cystic fibrosis (CF), a genetic disorder affecting the lungs and other organs."
    },
    {
        _id: "6",
        name: "When Nietzsche Wept",
        writer: "Irvin D. Yalom",
        image: book_6,
        price: 120,
        category: "Self-Help",
        description: "The audiobook 'When Nietzsche Wept' by Irvin D. Yalom, a renowned 20th-century author, blends reality, imagination, psychology, and philosophy, exploring the fates of Friedrich Nietzsche, Sigmund Freud, and Josef Breuer."
    },
    {
        _id: "7",
        name: "White Nights",
        writer: "Irvin D. Yalom",
        image: book_7,
        price: 150,
        category: "Classic Literature",
        description: "'White Nights' is a delicate romantic story by Fyodor Dostoevsky, depicting the emotions of a lonely young man searching for a companion."
    },
    {
        _id: "8",
        name: "They Both Die at the End",
        writer: "Adam Silvera",
        image: book_8,
        price: 170,
        category: "Mystery",
        description: "'They Both Die at the End' is a novel by Adam Silvera, an American author. It tells the story of Mateo and Rufus, who discover they have just one day to live, leading to unique experiences and an exploration of the beauty and unpredictability of life."
    },
    {
        _id: "9",
        name: "Symphony of the Dead",
        writer: "Abbas Maroufi",
        image: book_9,
        price: 70,
        category: "Self-Help",
        description: "'Symphony of the Dead' by Abbas Maroufi is one of the most significant contemporary Iranian novels, narrating the story of a family torn apart by ideological conflicts."
    },
    {
        _id: "10",
        name: "The Inheritance Games",
        writer: "Jennifer Lynn Barnes",
        image: book_10,
        price: 40,
        category: "Mystery",
        description: "The book 'The Inheritance Games' by Jennifer Lynn Barnes, translated by Najla Mohaqiq, is an American novel aimed at teens and young adults. It was published by Noon Publishing."
    },
    {
        _id: "11",
        name: "Reminders of Him",
        writer: "Colleen Hoover",
        image: book_11,
        price: 65,
        category: "Romance",
        description: "The book 'Reminders of Him' - also known as 'Memories of Her' - is a novel by Colleen Hoover, an American author, published in 2022. It tells the story of a woman named Kenna who spent five years in prison and has now returned to reconnect with her daughter, facing numerous challenges along the way."
    },
    {
        _id: "12",
        name: "The Stranger",
        writer: "Albert Camus",
        image: book_12,
        price: 155,
        category: "Classic Literature",
        description: "The book 'The Stranger' is a novel by Albert Camus, a renowned French author and philosopher. 'The Stranger' is one of Camus' most significant works, vividly portraying his philosophy and outlook on truth. The protagonist, Meursault, is a young man distinct from the general populace who cannot align with societal norms; this difference holds a profound truth. 'The Stranger' by Albert Camus is one of the 20th century's most remarkable novels."
    },
    {
        _id: "13",
        name: "Pride and Prejudice",
        writer: "Jane Austen",
        image: book_13,
        price: 165,
        category: "Classic Literature",
        description: "Jane Austen, an English author, has significantly influenced Western literature with her works. Her insights into women's lives and skillful use of satire have made her one of the most celebrated novelists of her time. 'Pride and Prejudice' is one of Austen's most famous works and is considered one of the world's top 100 literary masterpieces."
    },
    {
        _id: "14",
        name: "Words in Deep Blue",
        writer: "Cath Crowley",
        image: book_14,
        price: 105,
        category: "Romance",
        description: "The book 'Words in Deep Blue,' written by Cath Crowley, is a romantic novel about the intertwined lives of several individuals connected through beautiful letters and the mysterious world of books."
    },
    {
        _id: "15",
        name: "Dead Poets Society",
        writer: "N.H. Kleinbaum",
        image: book_15,
        price: 135,
        category: "Classic Literature",
        description: "The book 'Dead Poets Society,' authored by N.H. Kleinbaum, is based on the movie of the same name starring Robin Williams. Published in 1988, the novel recounts the inspiring story of an English teacher who encourages his repressed students to seize the day and live life to the fullest. The Persian version has been translated by Zahra Taravati and published by Nimaj."
    },
    {
        _id: "16",
        name: "The Blue Castle",
        writer: "L.M. Montgomery",
        image: book_16,
        price: 95,
        category: "Classic Literature",
        description: "The book 'The Blue Castle,' a novel by L.M. Montgomery, author of 'Anne of Green Gables,' 'Emily of New Moon,' and 'Tales of Avonlea,' has been published by Ghadir Publications. This book is translated by Mohammad Hesam Borjisian."
    },
    {
        _id: "17",
        name: "Why Has Nobody Told Me This Before?",
        writer: "Dr. Julie Smith",
        image: book_17,
        price: 170,
        category: "Self-Help",
        description: "The book 'Why Has Nobody Told Me This Before?' by Dr. Julie Smith, translated by Arezu Shantiyayi and published by Milkan Publications, provides readers with numerous strategies to manage emotions and achieve mental well-being. The book empowers its readers to navigate their journey toward health and resilience."
    },
    {
        _id: "18",
        name: "The Anxious Perfectionist",
        writer: "Clarissa W. Ong, Michael P. Twohig",
        image: book_18,
        price: 130,
        category: "Self-Help",
        description: "This highly readable and relatable book lights the path to freedom for those pursuing unattainable perfectionism. The authors guide readers in understanding how perfectionism, as a life directive, leads to failure and advocate for actions aligned with values rather than emotions. If you or someone you know is a perfectionist, or you are responsible for caring for perfectionists, this book is undoubtedly a 'must-have' for your library."
    },
    {
        _id: "19",
        name: "The Myth of Normal",
        writer: "Gabor Maté, Daniel Maté",
        image: book_19,
        price: 30,
        category: "Self-Help",
        description: "The book 'The Myth of Normal: Trauma, Illness, and Healing in a Toxic Culture' by Gabor Maté and Daniel Maté explores the challenges to mental and physical health in today's world. Gabor Maté, a physician, along with Daniel Maté, shares the results of years of research, shedding light on how modern lifestyles dominate us and harm our well-being."
    },
    {
        _id: "20",
        name: "Man's Search for Meaning",
        writer: "Viktor Frankl",
        image: book_20,
        price: 70,
        category: "Self-Help",
        description: "'Man's Search for Meaning' is a book by Viktor Frankl, an Austrian psychiatrist and the founder of logotherapy. In this book, Frankl recounts his experiences living in Auschwitz concentration camps."
    },
    {
        _id: "21",
        name: "Upgrade",
        writer: "Blake Crouch",
        image: book_21,
        price: 45,
        category: "Mystery",
        description: "Logan Ramsay isn't sure what's happening to him. He feels like he can focus faster and multitask better. He can read quicker and retain concepts more effectively. Gradually, his sleep duration shortens. Soon, Logan realizes that something has changed in his brain."
    },
    {
        _id: "22",
        name: "The Unwomanly Face of War",
        writer: "Svetlana Alexievich",
        image: book_22,
        price: 65,
        category: "Historical",
        description: "To understand the significance of 'The Unwomanly Face of War,' one must look at the statistics highlighted by Svetlana Alexievich. She mentions that at least 800,000 women served in the Soviet Army during World War II, taking on roles such as snipers, pilots, cooks, surgeons, and more, participating directly and indirectly in the war effort."
    },
    {
        _id: "23",
        name: "Stalin",
        writer: "Edvard Radzinsky",
        image: book_23,
        price: 115,
        category: "Historical",
        description: "This book is a comprehensive biography of Joseph Stalin, the leader of the Soviet Union, covering his life from childhood to his death. Edvard Radzinsky, the author of the book, has also written several other biographies of historical Russian figures and is renowned for his work as a playwright."
    },
    {
        _id: "25",
        name: "Humanity: A Moral History of the Twentieth Century",
        writer: "Jonathan Glover",
        image: book_25,
        price: 160,
        category: "Historical",
        description: "'Humanity,' written by an English philosopher, is a profound and thought-provoking exploration of the moral dimensions of some of the most harrowing events in modern history."
    }

];
