import {
  CoupleProfile,
  TimelineEvent,
  Memory,
  LoveLocation,
  Gift,
  Recipe,
  LoveLetter,
  FutureLetter,
  BucketItem,
  SpecialDay,
  Song,
  DailyNote,
} from '../types';

export const initialCoupleProfile: CoupleProfile = {
  id: 'couple-main',
  partner1: {
    name: 'Quang Thắng',
    nickname: 'Anh nhà 🏡',
    birthday: '2000-07-22',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    favFood: 'Mì Ý sốt bò bằm & Phở bò',
    favDrink: 'Sinh tố bơ & Cà phê muối',
    favPlace: 'Cinestar Đà Lạt & Bờ biển Nha Trang',
    favMovie: 'Nghỉ hè sợ nghỉ hưu (Cinestar Đà Lạt)',
    favSong: 'Ánh Đèn Sân Khấu / Lover',
    favColor: 'Xanh Sage & Nâu ấm',
    quote: 'Chỉ cần có Thỏ Ngọc bên cạnh, góc phố nào cũng hóa bình yên.',
  },
  partner2: {
    name: 'Bảo Ngọc',
    nickname: 'Thỏ Ngọc 🐰',
    birthday: '2000-11-08',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
    favFood: 'Mì Ý thơm lừng & Bánh kem dâu',
    favDrink: 'Sinh tố hoa quả mát lạnh',
    favPlace: 'Đà Lạt & Bãi biển Nha Trang trong xanh',
    favMovie: 'Nghỉ hè sợ nghỉ hưu',
    favSong: 'Until I Found You',
    favColor: 'Hồng pastel & Trắng kem',
    quote: 'Yêu anh là điều dịu dàng và đúng đắn nhất em từng đón nhận trong đời.',
  },
  relationshipStart: '2026-08-22T09:00:00',
  anniversaryDate: '08-22',
  couplePhoto: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&auto=format&fit=crop&q=80',
  romanticQuote: 'Mỗi khoảnh khắc bên nhau đều là một trang ký ức vô giá được viết bằng sự chân thành.',
  secretMessage: 'Gửi Thỏ Ngọc của Anh nhà: Cảm ơn em đã đến và làm cho mỗi ngày của anh đều ngập tràn niềm vui và sự dịu dàng. Yêu em rất nhiều! ❤️',
  passcode: '2208',
  thingsWeLove: [
    '🍝 Ăn mỳ Ý và uống sinh tố thơm ngon',
    '🎬 Đi xem phim tại Cinestar Đà Lạt',
    '🌊 Đi dạo và tắm biển Nha Trang',
    '🪷 Viếng chùa thanh tịnh cầu chúc bình an',
    '🐠 Khám phá đại dương ở Viện Hải Dương Học',
    '🛵 Nắm tay nhau dạo phố lúc thành phố lên đèn',
  ],
};

export const initialTimelineEvents: TimelineEvent[] = [
  {
    id: 't-1',
    date: '2026-08-21',
    title: 'Ngày gặp nhau đầu tiên (First Date)',
    location: 'Đà Lạt & Rạp Cinestar Đà Lạt',
    description: 'Bữa ăn đầu tiên cùng nhau ăn đĩa mỳ Ý thơm lừng và uống ly sinh tố mát lạnh. Sau đó hai đứa cùng đến Cinestar Đà Lạt xem bộ phim "Nghỉ hè sợ nghỉ hưu". Nụ cười của Thỏ Ngọc hôm ấy làm Thắng ngẩn ngơ cả buổi!',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    sticker: 'coffee',
    mood: 'Rung động',
    favorite: true,
  },
  {
    id: 't-2',
    date: '2026-08-22',
    title: 'Ngày chính thức ngỏ lời yêu ❤️',
    location: 'Đà Lạt mộng mơ',
    description: 'Chỉ 1 ngày sau buổi hẹn đầu tiên, Thắng lấy hết can đảm trao tặng Thỏ Ngọc lời tỏ tình chân thành từ đáy lòng. Khoảnh khắc Ngọc mỉm cười gật đầu, thế giới như nở hoa!',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80',
    sticker: 'heart',
    mood: 'Hạnh phúc',
    favorite: true,
  },
  {
    id: 't-3',
    date: '2026-08-29',
    title: 'Chuyến đi Nha Trang đầu tiên (29 - 31/08/2026)',
    location: 'Thành phố biển Nha Trang, Khánh Hòa',
    description: 'Kỷ niệm đầu tiên sau ngày tỏ tình: Hai đứa cùng nhau đi du lịch biển Nha Trang. Cùng đi viếng Chùa cầu chúc an lành, khám phá Viện Hải Dương Học và đắm mình tắm biển mát rượi.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    sticker: 'trip',
    mood: 'Lãng mạn',
    favorite: true,
  },
  {
    id: 't-4',
    date: '2026-08-30',
    title: 'Viếng Chùa & Thăm Viện Hải Dương Học',
    location: 'Viện Hải Dương Học & Chùa Long Sơn Nha Trang',
    description: 'Cùng viếng ngôi chùa thanh tịnh bình yên, rồi dắt tay nhau khám phá hàng ngàn sinh vật đại dương kỳ thú ở Viện Hải Dương Học.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    sticker: 'star',
    mood: 'Ý nghĩa',
    favorite: true,
  },
  {
    id: 't-5',
    date: '2026-08-31',
    title: 'Tắm biển Nha Trang & Những kỷ niệm ngọt ngào',
    location: 'Bãi biển Nha Trang',
    description: 'Cùng nhau tắm biển, ngắm những đợt sóng vỗ rì rào và ghi lại những bức ảnh nụ cười rạng rỡ của hai đứa trước khi tạm biệt Nha Trang.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80',
    sticker: 'ring',
    mood: 'Hạnh phúc',
    favorite: true,
  },
];

export const initialMemories: Memory[] = [
  {
    id: 'm-1',
    title: 'Bữa mỳ Ý, sinh tố & Phim "Nghỉ hè sợ nghỉ hưu"',
    description: 'Ngày 21/08/2026 lần đầu gặp nhau, hai đứa cùng ăn đĩa mỳ Ý nóng hổi, uống ly sinh tố mát lạnh rồi đến Cinestar Đà Lạt xem phim. Nụ cười của Thỏ Ngọc làm Thắng rung động mãi.',
    date: '2026-08-21',
    location: 'Đà Lạt & Rạp Cinestar Đà Lạt',
    photos: [
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Đà Lạt', 'Lần đầu gặp', 'Mỳ Ý', 'Sinh tố', 'Cinestar', 'Nghỉ hè sợ nghỉ hưu'],
    favorite: true,
    notes: 'Kỷ niệm khó quên nhất khởi đầu cho một hành trình ngọt ngào.',
  },
  {
    id: 'm-2',
    title: 'Khoảnh khắc ngỏ lời yêu (22/08/2026)',
    description: 'Đà Lạt chiều hoàng hôn se lạnh, Thắng lấy hết can đảm ngỏ lời yêu và vỡ òa khi Thỏ Ngọc mỉm cười gật đầu. Chúng mình chính thức là của nhau!',
    date: '2026-08-22',
    location: 'Đà Lạt mộng mơ',
    photos: [
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Đà Lạt', 'Tỏ tình', 'Chính thức yêu', 'Anh nhà & Thỏ Ngọc'],
    favorite: true,
    notes: 'Chiếc gật đầu đẹp nhất cuộc đời Thắng.',
  },
  {
    id: 'm-3',
    title: 'Khám phá Viện Hải Dương Học Nha Trang',
    description: 'Nha Trang ngày nắng đẹp, hai đứa dắt tay nhau đi giữa đường hầm thủy cung ngắm muôn loài cá bơi lội tung tăng và những chú rùa biển khổng lồ.',
    date: '2026-08-30',
    location: 'Viện Hải Dương Học, Nha Trang',
    photos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Nha Trang', 'Viện Hải Dương Học', 'Du lịch đầu tiên'],
    favorite: true,
    notes: 'Chụp được một album ảnh đôi siêu xinh.',
  },
  {
    id: 'm-4',
    title: 'Tắm biển Nha Trang cùng Thỏ Ngọc',
    description: 'Làn nước biển xanh ngắt mát rượi, sóng vỗ nhấp nhô. Hai đứa nắm chặt tay nhau nhảy sóng và chạy nhảy trên bãi cát mịn.',
    date: '2026-08-30',
    location: 'Bãi biển Nha Trang',
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Nha Trang', 'Tắm biển', 'Biển xanh', 'Kỷ niệm'],
    favorite: true,
    notes: 'Nụ cười Thỏ Ngọc dưới nắng biển đẹp như tranh vẽ.',
  },
  {
    id: 'm-5',
    title: 'Viếng Chùa thanh tịnh cầu an',
    description: 'Chuyến đi Nha Trang trọn vẹn hơn khi hai đứa cùng bước lên những bậc thềm chùa thanh tịnh, chắp tay thành kính cầu chúc bình an và tình cảm luôn gắn bó.',
    date: '2026-08-31',
    location: 'Chùa Long Sơn, Nha Trang',
    photos: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Nha Trang', 'Đi Chùa', 'Thanh tịnh', 'Cầu an'],
    favorite: false,
    notes: 'Cầu mong tình yêu hai đứa mình luôn an yên và hạnh phúc.',
  },
];

export const initialLocations: LoveLocation[] = [
  {
    id: 'loc-1',
    placeName: 'Đà Lạt',
    date: '2026-08-21',
    description: 'Nơi định mệnh bắt đầu: Lần đầu gặp nhau ngày 21/08/2026, cùng ăn mỳ Ý, uống sinh tố, xem phim "Nghỉ hè sợ nghỉ hưu" tại Cinestar và ngày tỏ tình 22/08.',
    photos: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80'],
    lat: 11.9404,
    lng: 108.4583,
    favorite: true,
    mood: 'Nơi bắt đầu',
  },
  {
    id: 'loc-2',
    placeName: 'Nha Trang',
    date: '2026-08-29',
    description: 'Kỷ niệm đầu tiên sau khi tỏ tình (29 - 31/08/2026): Cùng nhau viếng Chùa thanh tịnh, khám phá Viện Hải Dương Học và thỏa thích tắm biển xanh.',
    photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'],
    lat: 12.2388,
    lng: 109.1967,
    favorite: true,
    mood: 'Chuyến đi đầu tiên',
  },
  {
    id: 'loc-3',
    placeName: 'Hà Nội',
    date: '2026-09-05',
    description: 'Những góc phố thân quen, quán trà ấm áp nơi hai đứa cùng hẹn hò, tâm sự chuyện tương lai.',
    photos: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'],
    lat: 21.0285,
    lng: 105.8542,
    favorite: false,
    mood: 'Bình yên',
  },
];

export const initialGifts: Gift[] = [
  {
    id: 'g-1',
    name: 'Máy ảnh chụp lấy liền Fujifilm Instax Mini',
    photos: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'],
    giver: 'Quang Thắng',
    receiver: 'Bảo Ngọc',
    date: '2026-08-22',
    occasion: 'Anniversary',
    description: 'Tặng Thỏ Ngọc một chiếc máy ảnh màu pastel để cùng nhau lưu lại từng khoảnh khắc thanh xuân.',
    story: 'Ngọc đã nhảy cẫng lên và chụp ngay tấm đầu tiên là nụ cười rạng rỡ của Thắng!',
    favorite: true,
  },
  {
    id: 'g-2',
    name: 'Vòng tay handmade đan chỉ đỏ may mắn',
    photos: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'],
    giver: 'Bảo Ngọc',
    receiver: 'Quang Thắng',
    date: '2026-08-22',
    occasion: 'Kỷ niệm',
    description: 'Vòng tay Thỏ Ngọc tự tay đan để chúc Anh nhà luôn bình an và vui vẻ.',
    story: 'Thắng đeo liền vào tay và hứa sẽ giữ gìn thật cẩn thận như bảo bối.',
    favorite: true,
  },
  {
    id: 'g-3',
    name: 'Bình giữ nhiệt đôi khắc tên Thắng & Ngọc',
    photos: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80'],
    giver: 'Quang Thắng',
    receiver: 'Bảo Ngọc',
    date: '2026-09-05',
    occasion: 'Bất ngờ',
    description: 'Để cô bé Thỏ Ngọc luôn nhớ uống đủ nước ấm mỗi ngày khi đi làm.',
    story: 'Ngọc mang theo đi làm mỗi ngày và khoe với cả phòng làm việc.',
    favorite: true,
  },
];

export const initialRecipes: Recipe[] = [
  {
    id: 'r-1',
    name: 'Mì Ý sốt bò bằm Bolognese & Sinh tố (Món ăn đầu tiên 21/08)',
    photos: [
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=800&auto=format&fit=crop&q=80',
    ],
    dateCooked: '2026-08-21',
    recipeUrl: 'https://youtube.com',
    ingredients: [
      'Mì Ý sợi tròn thơm ngon',
      'Thịt bò xay tươi đậm vị sốt cà chua',
      'Phô mai parmesan béo ngậy',
      'Sinh tố trái cây mát lạnh giải nhiệt',
    ],
    instructions: [
      'Luộc mì al dente chín tới.',
      'Nấu sốt bò bằm đậm đà thơm ngát hành tây và bơ tỏi.',
      'Xay ly sinh tố mát lạnh ngọt dịu.',
      'Cùng nhau thưởng thức trước khi đến rạp Cinestar xem phim.',
    ],
    cookTime: '30 phút',
    difficulty: 'Dễ làm',
    cookedBy: 'Bữa ăn đầu tiên của hai đứa',
    rating: 5,
    review: 'Món ăn đầu tiên trong buổi hẹn hò định mệnh tại Đà Lạt. Vừa ăn vừa ngượng ngùng nói chuyện, ngọt ngào không thể nào quên!',
    notes: 'Kỷ niệm khó phai của Thắng và Ngọc.',
    favorite: true,
  },
  {
    id: 'r-2',
    name: 'Bít tết bò Úc sốt tiêu đen kèm khoai tây nghiền',
    photos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    ],
    dateCooked: '2026-09-08',
    recipeUrl: 'https://youtube.com',
    ingredients: [
      'Thăn ngoại bò Úc tươi ngon',
      'Khoai tây luộc chín nghiền nhuyễn với bơ sữa',
      'Tiêu sọ thơm lừng, bơ lạt',
      'Sốt tiêu đen ấm nóng',
    ],
    instructions: [
      'Thấm khô thịt bò, ướp muối tiêu nhẹ.',
      'Áp chảo lửa lớn với bơ và tỏi thơm lừng.',
      'Để thịt nghỉ 5 phút trước khi cắt lát.',
      'Rưới sốt tiêu ấm nóng ăn kèm khoai tây nghiền.',
    ],
    cookTime: '35 phút',
    difficulty: 'Vừa sức',
    cookedBy: 'Anh nhà trổ tài cho Thỏ Ngọc',
    rating: 5,
    review: 'Thịt mềm ngọt mọng nước, Thỏ Ngọc khen nức nở!',
    notes: 'Bữa tối ấm cúng tại nhà.',
    favorite: true,
  },
  {
    id: 'r-3',
    name: 'Bánh pancake dâu tây mật ong cho bữa sáng',
    photos: [
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80',
    ],
    dateCooked: '2024-08-04',
    recipeUrl: 'https://youtube.com',
    ingredients: [
      'Bột mì hữu cơ, bột nở, trứng gà tươi',
      'Sữa tươi không đường & vani',
      'Dâu tây tươi cắt lát mỏng',
      'Mật ong rừng và bơ tan chảy',
    ],
    instructions: [
      'Rây bột mịn, đánh tan cùng trứng và sữa đến khi sền sệt.',
      'Rán lửa nhỏ trên chảo chống dính đến khi nổi bọt khí thì lật.',
      'Xếp chồng bánh, rưới mật ong thơm và xếp dâu tây quanh đĩa.',
    ],
    cookTime: '20 phút',
    difficulty: 'Dễ làm',
    cookedBy: 'Bé Mèo làm tặng anh',
    rating: 5,
    review: 'Bánh xốp mềm bông như mây, ăn ngọt ngào khởi đầu ngày mới.',
    notes: 'Ăn kèm một ly trà lài nóng là chuẩn bài.',
    favorite: true,
  },
];

export const initialLetters: LoveLetter[] = [
  {
    id: 'l-1',
    title: 'Open when you\'re sad (Khi Thỏ Ngọc thấy buồn)',
    date: '2026-08-25',
    sender: 'Quang Thắng (Anh nhà)',
    recipient: 'Bảo Ngọc (Thỏ Ngọc)',
    category: "Open when you're sad",
    content: `Thỏ Ngọc thương mến của anh,

Nếu hôm nay có chuyện gì làm em buồn lòng hay mệt mỏi, hãy hít thở thật sâu và nhớ rằng: Em đã làm rất tốt rồi! 

Thế giới ngoài kia có thể xô bồ và đôi khi khiến em tủi thân, nhưng ở đây, Anh nhà luôn là chỗ dựa bình yên và dịu dàng nhất của em. Em không cần phải lúc nào cũng gồng mình mạnh mẽ đâu, cứ tựa vào vai anh mà nũng nịu nhé. 

Anh sẽ luôn ở đây ôm em thật chặt, mua món ngon cho em và lắng nghe em chia sẻ. Yêu Thỏ Ngọc vô cùng! ❤️`,
    mood: 'Ấm áp',
    isOpened: false,
  },
  {
    id: 'l-2',
    title: 'Open when you miss me (Khi em nhớ anh nhiều)',
    date: '2026-08-28',
    sender: 'Quang Thắng',
    recipient: 'Bảo Ngọc',
    category: "Open when you miss me",
    content: `Chào cô bé Thỏ Ngọc đáng yêu của anh,

Khi em mở bức thư này, chắc là chúng mình đang tạm xa nhau vài hôm đúng không? 

Hãy sờ lên trái tim mình nhé: Anh nhà cũng đang nhớ em cồn cào hệt như vậy đấy! Mỗi giây phút xa em, trong đầu anh chỉ toàn là nụ cười trong veo và đôi mắt lấp lánh của em thôi. Nhắn tin cho anh ngay đi, dù bận đến đâu anh cũng sẽ hồi âm em đầu tiên! 

Nhớ Thỏ Ngọc nhiều ơi là nhiều! 🏡❤️🐰`,
    mood: 'Ngọt ngào',
    isOpened: true,
  },
  {
    id: 'l-3',
    title: 'Open when we had a fight (Khi hai đứa lỡ cãi nhau)',
    date: '2026-09-01',
    sender: 'Quang Thắng',
    recipient: 'Bảo Ngọc',
    category: "Open when we had a fight",
    content: `Bảo Ngọc ơi,

Đầu tiên, anh xin lỗi vì nếu có điều gì lỡ làm em buồn hay để cảm xúc bất đồng lấn át. 

Anh yêu em nhiều hơn bất kỳ cái tôi hay sự đúng sai nào. Mục đích của chúng mình khi ở bên nhau là cùng nắm tay vượt qua mọi trở ngại, chứ không phải hơn thua với nhau.

Cơn giận rồi sẽ tan biến, chỉ có tình cảm chân thành là ở lại. Uống ngụm nước, nguôi giận rồi cho Anh nhà ôm một cái thật chặt làm hòa nhé? Anh thương em!`,
    mood: 'Chân thành',
    isOpened: false,
  },
  {
    id: 'l-4',
    title: 'Open on our anniversary (Ngày kỷ niệm 22/08)',
    date: '2026-08-22',
    sender: 'Quang Thắng & Bảo Ngọc',
    recipient: 'Hai đứa mình',
    category: 'Open on our anniversary',
    content: `Mừng ngày 22/08 — Ngày chúng mình chính thức chung bước!

Từ những bỡ ngỡ ban đầu cho đến khi trở thành "Anh nhà" và "Thỏ Ngọc" của nhau, anh cảm thấy mình là chàng trai may mắn nhất. Cảm ơn em đã bước vào cuộc sống của anh và mang theo muôn vàn dịu dàng.

Chúc cho tình yêu của Thắng và Ngọc luôn đong đầy, bền bỉ và ngọt ngào qua từng năm tháng. Yêu em thật nhiều! 🥂✨`,
    mood: 'Hạnh phúc',
    isOpened: true,
  },
  {
    id: 'l-5',
    title: 'Open when you can\'t sleep (Khi Thỏ Ngọc trằn trọc mất ngủ)',
    date: '2026-09-08',
    sender: 'Quang Thắng',
    recipient: 'Bảo Ngọc',
    category: "Open when you can't sleep",
    content: `Ngoan nào, nhắm mắt lại và thả lỏng người ra em nhé.

Đừng nghĩ về những âu lo của ngày mai nữa, đêm nay hãy để giấc mơ mang em đến những khu vườn ngập tràn bình yên. Anh gửi đến Thỏ Ngọc một ngàn cái ôm ấm áp và những lời chúc ngủ ngon dịu dàng nhất.

Ngủ thật ngoan nhé em yêu, ngày mai thức dậy sẽ lại là một ngày rạng ngời! 🌙⭐`,
    mood: 'Dỗ dành',
    isOpened: false,
  },
];

export const initialFutureLetters: FutureLetter[] = [
  {
    id: 'fl-1',
    title: 'Gửi Thắng và Ngọc vào kỷ niệm 1 năm quen nhau (22/08/2027)',
    writeDate: '2026-08-22',
    unlockDate: '2027-08-22',
    sender: 'Quang Thắng & Bảo Ngọc',
    recipient: 'Tương lai của chúng mình',
    content: `Chào Thắng và Ngọc của ngày 22/08/2027! 

Lúc viết những dòng này là những ngày đầu tiên hai đứa chính thức bên nhau, lòng vẫn còn bao nhiêu bồi hồi và hạnh phúc. Không biết tròn 1 năm sau, chúng mình đã cùng nhau đi thêm được bao nhiêu vùng đất mới? 

Mong rằng dù cuộc sống có bận rộn đến đâu, hai bạn vẫn luôn mỉm cười khi nhìn thấy nhau và giữ trọn sự trân trọng như ngày đầu nhé!`,
    sealed: true,
  },
  {
    id: 'fl-2',
    title: 'Gửi sinh nhật tuổi 26 của Thỏ Ngọc (08/11/2026)',
    writeDate: '2026-08-22',
    unlockDate: '2026-11-08',
    sender: 'Quang Thắng',
    recipient: 'Bảo Ngọc tuổi 26',
    content: `Chúc mừng sinh nhật cô gái tháng 11 tuyệt vời nhất của anh! Đây là sinh nhật đầu tiên anh được đồng hành cùng em với tư cách là người yêu, và anh hứa sẽ làm cho ngày này của em ngập tràn niềm vui!`,
    sealed: true,
  },
];

export const initialBucketList: BucketItem[] = [
  {
    id: 'b-1',
    title: 'Chuyến đi Nha Trang đầu tiên sau ngày tỏ tình (29 - 31/08/2026)',
    description: 'Cùng Thỏ Ngọc viếng chùa cầu an, khám phá Viện Hải Dương Học và thỏa thích tắm biển xanh.',
    category: 'Travel',
    completed: true,
    completedDate: '2026-08-31',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'b-2',
    title: 'Cùng nhau xem phim "Nghỉ hè sợ nghỉ hưu" tại Cinestar Đà Lạt',
    description: 'Buổi hẹn hò đầu tiên ăn mỳ Ý, uống sinh tố và xem phim cùng nhau ngày 21/08/2026.',
    category: 'Experiences',
    completed: true,
    completedDate: '2026-08-21',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'b-3',
    title: 'Đi cắm trại qua đêm bên hồ ngắm sao trời',
    description: 'Dựng lều, đốt lửa trại nướng khoai và đàn hát dưới bầu trời sao.',
    category: 'Experiences',
    completed: false,
  },
  {
    id: 'b-4',
    title: 'Chuyến du lịch nước ngoài đầu tiên cùng nhau (Thái Lan / Nhật Bản)',
    description: 'Khám phá văn hóa ẩm thực đường phố và chụp thật nhiều ảnh polaroid.',
    category: 'Travel',
    completed: false,
  },
  {
    id: 'b-5',
    title: 'Cùng nhau tham gia một giải chạy Marathon đôi 10km',
    description: 'Tập luyện cùng nhau mỗi sáng và nắm tay cán đích.',
    category: 'Experiences',
    completed: false,
  },
  {
    id: 'b-6',
    title: 'Nhận nuôi một bé mèo hoặc thỏ con cưng',
    description: 'Cùng nhau chăm sóc cho bé lớn khôn.',
    category: 'Future',
    completed: false,
  },
  {
    id: 'b-7',
    title: 'Chụp một bộ ảnh polaroid lưu giữ thanh xuân đôi mình',
    description: 'Mỗi chuyến đi xa đều chụp thêm những tấm ảnh dán vào sổ kỷ niệm.',
    category: 'Photos',
    completed: true,
    completedDate: '2026-08-31',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'b-8',
    title: 'Cùng nhau thiết kế một ngôi nhà ấm cúng ngập tràn hoa tươi',
    description: 'Căn nhà nhỏ của Anh nhà và Thỏ Ngọc tràn ngập yêu thương.',
    category: 'Future',
    completed: false,
  },
];

export const initialSpecialDays: SpecialDay[] = [
  {
    id: 'sd-1',
    title: 'Ngày gặp nhau đầu tiên (21/08)',
    date: '2026-08-21',
    category: 'Cột mốc',
    description: 'Ăn mỳ Ý, uống sinh tố & Xem phim "Nghỉ hè sợ nghỉ hưu" tại Cinestar Đà Lạt.',
    icon: 'coffee',
  },
  {
    id: 'sd-2',
    title: 'Ngày chính thức tỏ tình & Quen nhau (22/08)',
    date: '2026-08-22',
    category: 'Kỷ niệm',
    description: 'Thắng ngỏ lời yêu chân thành và Ngọc mỉm cười gật đầu đồng ý!',
    icon: 'ring',
  },
  {
    id: 'sd-3',
    title: 'Chuyến đi Nha Trang đầu tiên (29 - 31/08)',
    date: '2026-08-29',
    category: 'Kỷ niệm',
    description: 'Kỷ niệm đầu tiên sau khi yêu: Viếng chùa, Viện Hải Dương Học và tắm biển.',
    icon: 'heart',
  },
  {
    id: 'sd-4',
    title: 'Sinh nhật Anh nhà (Quang Thắng)',
    date: '2000-07-22',
    category: 'Sinh nhật',
    description: 'Ngày chàng trai ấm áp, chu đáo của Thỏ Ngọc chào đời.',
    icon: 'gift',
  },
  {
    id: 'sd-5',
    title: 'Sinh nhật Thỏ Ngọc (Bảo Ngọc)',
    date: '2000-11-08',
    category: 'Sinh nhật',
    description: 'Ngày cô gái dịu dàng, đáng yêu nhất thế giới xuất hiện.',
    icon: 'gift',
  },
  {
    id: 'sd-6',
    title: 'Lễ tình nhân Valentine',
    date: '2027-02-14',
    category: 'Lễ hội',
    description: 'Ngày của socola và ngàn lời ngọt ngào.',
    icon: 'heart',
  },
  {
    id: 'sd-7',
    title: 'Đêm Giáng Sinh ấm áp',
    date: '2026-12-24',
    category: 'Lễ hội',
    description: 'Cùng nhau đếm ngược dưới cây thông Noel lung linh.',
    icon: 'star',
  },
];

export const initialSongs: Song[] = [
  {
    id: 's-1',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    url: 'https://open.spotify.com',
    note: 'Bài hát đầu tiên anh gửi cho em trong đêm mưa gió, lời bài hát như thay cho lời tim anh muốn nói.',
    isOurSong: true,
  },
  {
    id: 's-2',
    title: 'Lover',
    artist: 'Taylor Swift',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    url: 'https://open.spotify.com',
    note: 'Mỗi lần lái xe chở em đi dạo hồ Tây là hai đứa lại cùng hát nghêu ngao điệp khúc.',
    isOurSong: false,
  },
  {
    id: 's-3',
    title: 'Ánh Đèn Sân Khấu',
    artist: 'Hoàng Dũng',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    url: 'https://open.spotify.com',
    note: 'Buổi concert đầu tiên hai đứa chen chúc cùng nhau dưới mưa nhưng ấm lòng vô cùng.',
    isOurSong: false,
  },
  {
    id: 's-4',
    title: 'Can\'t Take My Eyes Off You',
    artist: 'Frankie Valli',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
    url: 'https://open.spotify.com',
    note: 'Điệu nhảy vụng về của hai đứa ở góc ban công lúc nửa đêm.',
    isOurSong: false,
  },
];

export const initialDailyNotes: DailyNote[] = [
  {
    id: 'dn-1',
    date: '2026-08-22',
    note: 'Dù ngoài kia có bao nhiêu bão giông, Thỏ Ngọc luôn là bến đỗ bình yên nhất của anh!',
    author: 'Anh nhà 🏡',
  },
  {
    id: 'dn-2',
    date: '2026-08-25',
    note: 'Hôm nay trời nắng đẹp, nhớ uống nhiều nước và ăn trưa đúng giờ nhé người yêu của em!',
    author: 'Thỏ Ngọc 🐰',
  },
  {
    id: 'dn-3',
    date: '2026-09-01',
    note: 'Cảm ơn Anh nhà vì luôn nhường phần bánh ngon nhất và chăm sóc em từng chút một. Yêu anh nhiều!',
    author: 'Thỏ Ngọc 🐰',
  },
];

export const initialLoveStoryData: import('../types').LoveStoryData = {
  profile: initialCoupleProfile,
  events: initialTimelineEvents,
  memories: initialMemories,
  locations: initialLocations,
  gifts: initialGifts,
  recipes: initialRecipes,
  letters: initialLetters,
  futureLetters: initialFutureLetters,
  bucketList: initialBucketList,
  specialDays: initialSpecialDays,
  songs: initialSongs,
  dailyNotes: initialDailyNotes,
  passcode: initialCoupleProfile.passcode || '',
  secretMessage: initialCoupleProfile.secretMessage || "If you're reading this... I love you. A lot. ❤️",
};

export const initialLoveLocations = initialLocations;
export const initialLoveLetters = initialLetters;
