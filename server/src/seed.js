require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Temple = require('./models/Temple');
const Festival = require('./models/Festival');
const PilgrimageCircuit = require('./models/PilgrimageCircuit');
const User = require('./models/User');

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB Atlas for verified data population...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas successfully.');

    // Clear existing temples, festivals, circuits for a clean, verified state
    await Temple.deleteMany({});
    await Festival.deleteMany({});
    await PilgrimageCircuit.deleteMany({});
    console.log('Cleared existing temple, festival, and circuit collections.');

    // 1. Seed Verified Festivals
    const festivalsData = [
      {
        name: 'Maha Shivaratri',
        period: 'February – March (Phalguna Krishna Chaturdashi)',
        description: 'The great night of Lord Shiva celebrated across India with night-long vigils, Rudrabhishekam, and chanting of sacred mantras.',
        significance: 'Commemorates the cosmic dance (Tandava) of Lord Shiva and his divine union with Goddess Parvati.'
      },
      {
        name: 'Puri Ratha Yatra (Chariot Festival)',
        period: 'June – July (Ashadha Shukla Dwitiya)',
        description: 'The world-renowned chariot festival where Lord Jagannath, Balabhadra, and Subhadra travel on colossal wooden chariots to the Gundicha Temple.',
        significance: 'Allows all devotees, regardless of caste or background, darshan of Lord Jagannath on the grand avenue (Bada Danda).'
      },
      {
        name: 'Tirumala Sri Venkateswara Brahmotsavam',
        period: 'September – October (Navaratri / Ashwina Month)',
        description: 'A grand nine-day annual festival celebrated at Tirumala with magnificent processions of Lord Malayappa Swamy on sacred vahanas.',
        significance: 'Instituted originally by Lord Brahma to honor Lord Srinivasa for the spiritual welfare of humanity.'
      },
      {
        name: 'Chithirai Thiruvizha',
        period: 'April – May (Chaitra Month)',
        description: 'A vibrant month-long cultural and religious festival in Madurai featuring the celestial coronation and wedding of Goddess Meenakshi with Lord Sundareswarar.',
        significance: 'Unites Shaivite and Vaishnavite traditions with the arrival of Lord Kallazhagar at the Vaigai River.'
      },
      {
        name: 'Diwali & Dev Deepawali',
        period: 'October – November (Kartika Month)',
        description: 'Celebrated with millions of clay lamps (diyas) illuminating the ghats of Varanasi and sacred temple complexes across India.',
        significance: 'Commemorates Lord Shiva’s victory over the demon Tripurasura and the advent of spiritual light over ignorance.'
      },
      {
        name: 'Kumbh Mela & Ujjain Simhastha',
        period: 'Cyclic every 12 years (Ujjain, Haridwar, Prayagraj, Nashik)',
        description: 'The world\'s largest spiritual gathering of humanity where millions take holy dips in sacred rivers like Shipra, Ganga, and Godavari.',
        significance: 'Commemorates drops of the nectar of immortality (Amrita) falling from the celestial pitcher during the Samudra Manthan.'
      },
      {
        name: 'Sharad Navaratri & Durga Puja',
        period: 'September – October (Ashwina Shukla Paksha)',
        description: 'Nine celestial nights dedicated to the forms of Goddess Durga, celebrated with immense fervor, garba dances, and grand pujas.',
        significance: 'Celebrates the divine triumph of Goddess Durga over the demon Mahishasura, symbolizing the victory of cosmic righteousness.'
      },
      {
        name: 'Krishna Janmashtami',
        period: 'August – September (Bhadrapada Krishna Ashtami)',
        description: 'Joyous pan-Indian celebration marking the divine advent of Lord Sri Krishna with midnight aartis, Dahi Handi, and temple pageantry.',
        significance: 'Commemorates the divine incarnation of Lord Krishna to restore Dharma and establish universal love.'
      },
      {
        name: 'Makaravilakku & Mandala Mahotsavam',
        period: 'November – January (Mandala Season & Makara Sankranti)',
        description: 'The sacred two-month pilgrimage season at Sabarimala where millions of devotees observing 41-day strict vratham witness the celestial light.',
        significance: 'Witnessing the divine Makaravilakku flame on Ponnambalamedu hill symbolizing Lord Ayyappa\'s cosmic grace.'
      },
      {
        name: 'Vaikunta Ekadashi',
        period: 'December – January (Margashirsha / Dhanur Month)',
        description: 'A deeply revered Vaishnavite festival where the celestial Paramapada Vasal (Gateway to Heaven) opens for devotees at Srirangam, Tirupati, and Padmanabhaswamy temples.',
        significance: 'Believed to grant liberation from the cycle of rebirth to all devotees who pass through the northern sanctum door.'
      },
      {
        name: 'Karthigai Deepam',
        period: 'November – December (Karthigai Pournami)',
        description: 'The ancient festival of lights at Tiruvannamalai where a colossal Mahadeepam flame is lit atop the 2,668-ft sacred Arunachala hill using 3,500 kg of pure ghee.',
        significance: 'Commemorates Lord Shiva manifesting as the infinite column of cosmic fire (Agni Lingam) without beginning or end.'
      },
      {
        name: 'Shravan Maas & Kanwar Yatra',
        period: 'July – August (Shravan Month)',
        description: 'Millions of saffron-clad Kanwariya pilgrims carry holy Ganga water on foot across hundreds of kilometers to offer abhishekam at Baidyanath, Kashi Vishwanath, and Haridwar.',
        significance: 'Cooling Lord Shiva’s throat after he consumed the deadly Halahala poison to protect creation during the Samudra Manthan.'
      },
      {
        name: 'Guruvayur Ekadashi & Chembai Music Festival',
        period: 'November – December (Vrishchika Shukla Ekadashi)',
        description: 'A deeply devotional celebration featuring elephant pageantry, round-the-clock darshan of Lord Guruvayurappan, and classical Carnatic music offerings.',
        significance: 'Commemorates the day Lord Krishna delivered the holy Bhagavad Gita to Arjuna on the battlefield of Kurukshetra (Gita Jayanti).'
      },
      {
        name: 'Modhera Dance Festival (Uttarardh Mahotsav)',
        period: 'January (Third week of January)',
        description: 'A glorious classical dance festival held annually against the dramatic illuminated stone backdrop of the 11th-century Sun Temple and its stepped Sabha Mandap.',
        significance: 'Celebrates the northward journey of the Sun (Uttarayana) with India’s foremost classical dance traditions.'
      },
      {
        name: 'Chidambaram Natyanjali Dance Festival',
        period: 'February – March (Maha Shivaratri period)',
        description: 'An annual five-day festival where leading classical dancers perform the 108 Karanas under the golden roof of the Nataraja Temple as an offering to the Lord of Dance.',
        significance: 'Spiritual dedication of the performing arts directly to Lord Nataraja in the cosmic dance hall (Chit Sabha).'
      }
    ];

    const createdFestivals = await Festival.insertMany(festivalsData);
    console.log(`Seeded ${createdFestivals.length} authentic festivals.`);

    const shivaratriId = createdFestivals.find(f => f.name === 'Maha Shivaratri')?._id;
    const rathYatraId = createdFestivals.find(f => f.name.includes('Ratha Yatra'))?._id;
    const brahmotsavamId = createdFestivals.find(f => f.name.includes('Brahmotsavam'))?._id;
    const chithiraiId = createdFestivals.find(f => f.name.includes('Chithirai'))?._id;
    const diwaliId = createdFestivals.find(f => f.name.includes('Diwali'))?._id;
    const kumbhId = createdFestivals.find(f => f.name.includes('Kumbh'))?._id;
    const navaratriId = createdFestivals.find(f => f.name.includes('Navaratri'))?._id;
    const janmashtamiId = createdFestivals.find(f => f.name.includes('Janmashtami'))?._id;
    const makaravilakkuId = createdFestivals.find(f => f.name.includes('Makaravilakku'))?._id;
    const vaikuntaId = createdFestivals.find(f => f.name.includes('Vaikunta'))?._id;
    const karthigaiId = createdFestivals.find(f => f.name.includes('Karthigai'))?._id;
    const shravanId = createdFestivals.find(f => f.name.includes('Shravan'))?._id;
    const guruvayurEkadashiId = createdFestivals.find(f => f.name.includes('Guruvayur'))?._id;
    const modheraDanceId = createdFestivals.find(f => f.name.includes('Modhera'))?._id;
    const natyanjaliId = createdFestivals.find(f => f.name.includes('Natyanjali'))?._id;

    // 2. Seed Verified Temples
    const templesData = [
      {
        name: 'Meenakshi Amman Temple',
        slug: 'meenakshi-amman-temple-madurai',
        description: 'A historic Hindu temple situated on the southern bank of the Vaigai River in Madurai, dedicated to Goddess Meenakshi (a form of Parvati) and her consort Sundareswarar (a form of Shiva). The complex boasts 14 magnificent sculpted Gopurams and the celebrated Thousand Pillar Hall.',
        history: 'Founded in antiquity with mentions in Sangam literature from the 6th century BCE, the current monumental structures were rebuilt and restored in the 16th and 17th centuries by the Nayak dynasty rulers, especially Tirumala Nayaka. It remains one of the greatest examples of Dravidian architectural mastery.',
        deity: 'Goddess Meenakshi & Lord Sundareswarar',
        location: {
          state: 'Tamil Nadu',
          city: 'Madurai',
          address: 'Madurai Main, Madurai, Tamil Nadu 625001',
          coordinates: { lat: 9.9195, lng: 78.1193 }
        },
        rituals: [
          { name: 'Thiruvanandal Pooja', time: '05:00 AM', description: 'Early morning waking ritual with temple musical accompaniments.' },
          { name: 'Kalasandhi Pooja', time: '06:30 AM', description: 'Morning worship ritual with holy abhishekam.' },
          { name: 'Uchikalam Pooja', time: '11:30 AM', description: 'Midday worship and naivedyam offering.' },
          { name: 'Palliarai Pooja', time: '09:30 PM', description: 'Night ceremonial procession escorting the Lord to the bedchamber.' }
        ],
        darshanTimings: {
          morning: '05:00 AM – 12:30 PM',
          evening: '04:00 PM – 10:00 PM',
          specialTimings: '05:00 AM – 10:00 PM continuous on auspicious festival days'
        },
        festivals: chithiraiId ? [chithiraiId, shivaratriId] : [],
        visitorGuidelines: {
          dressCode: 'Strict traditional dress code. Men: Dhoti/Veshti with shirt or angavastram. Women: Saree, half-saree, or salwar kameez with dupatta. Jeans, shorts, and skirts are prohibited.',
          photographyRules: 'Mobile phones and cameras are prohibited inside the sanctum sanctorum. Electronic locker counters are available outside.',
          footwearRules: 'Strictly prohibited inside the complex. Free and secure footwear deposit counters operate at all four tower entrances.',
          generalBehavior: 'Maintain silence in the inner corridors. Follow queue discipline during special darshan.'
        },
        nearbyFacilities: {
          accommodation: ['Madurai Temple View Lodge', 'Heritage Madurai', 'Hotel Supreme', 'TTDC Tamil Nadu Hotel'],
          transportation: ['Madurai Junction Railway Station (1.5 km)', 'Madurai International Airport (12 km)', 'Periyar Central Bus Stand (1 km)'],
          food: ['Murugan Idli Shop', 'Hotel Sree Sabarees Pure Veg', 'Amma Mess']
        },
        category: 'Dravidian Heritage',
        featured: true,
        popular: true,
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Meenakshi_Amman_Temple%2C_Madurai.jpg/1280px-Meenakshi_Amman_Temple%2C_Madurai.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Kashi Vishwanath Temple',
        slug: 'kashi-vishwanath-temple-varanasi',
        description: 'One of the most revered Hindu temples dedicated to Lord Shiva, located on the western bank of the sacred river Ganga in Varanasi. It enshrines one of the twelve sacred Jyotirlingas, symbolizing supreme cosmic consciousness.',
        history: 'Kashi is regarded as one of the oldest living cities in human history. The temple was rebuilt in 1780 by the noble queen Ahilyabai Holkar of Indore. In 2021, the Kashi Vishwanath Corridor was opened, connecting the temple directly to the historic Manikarnika and Lalita Ghats.',
        deity: 'Lord Shiva (Vishveshwara / Vishwanath)',
        location: {
          state: 'Uttar Pradesh',
          city: 'Varanasi',
          address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001',
          coordinates: { lat: 25.3109, lng: 83.0107 }
        },
        rituals: [
          { name: 'Mangala Aarti', time: '03:00 AM – 04:00 AM', description: 'The auspicious awakening aarti before sunrise.' },
          { name: 'Bhog Aarti', time: '11:15 AM – 12:20 PM', description: 'Sacred food offering to the presiding Jyotirlinga.' },
          { name: 'Sandhya Aarti', time: '07:00 PM – 08:15 PM', description: 'Grand evening devotional prayer with incense and damru drums.' },
          { name: 'Shayan Aarti', time: '10:30 PM – 11:00 PM', description: 'Closing night aarti before the sanctum is sealed.' }
        ],
        darshanTimings: {
          morning: '04:00 AM – 11:00 AM',
          evening: '12:00 PM – 11:00 PM',
          specialTimings: '24-hour continuous darshan on Maha Shivaratri and Shravan Mondays'
        },
        festivals: shivaratriId ? [shivaratriId, diwaliId] : [],
        visitorGuidelines: {
          dressCode: 'Decent and modest Indian or Western attire. Traditional Dhoti-Kurta or Saree is mandatory for touch-darshan (Sparsh Darshan) during morning rituals.',
          photographyRules: 'Mobile phones and electronic gadgets are strictly prohibited inside the inner complex. Cloakrooms are provided at the corridor gates.',
          footwearRules: 'Footwear must be deposited at designated security shoe stalls before entering the corridor.',
          generalBehavior: 'Carry valid photo identification (Aadhaar or Passport) for priority and suvidha darshan bookings.'
        },
        nearbyFacilities: {
          accommodation: ['Kashi Vishwanath Guest House', 'BrijRama Palace Varanasi', 'Hotel Surya', 'International Yatri Niwas'],
          transportation: ['Varanasi Junction (BSB) 4 km', 'Lal Bahadur Shastri Airport Babatpur (24 km)', 'Ghat Auto-rickshaw stand'],
          food: ['Kashi Chat Bhandar', 'Deena Chaat Bhandar', 'Annapurna Temple Annakshetra (Free Mahaprasad)']
        },
        category: '12 Jyotirlingas',
        featured: true,
        popular: true,
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/f/ff/Kashi_Vishwanath.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Varanasi_Ghats_-_Panoramic_View.jpg/1280px-Varanasi_Ghats_-_Panoramic_View.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Venkateswara Temple (Tirupati Balaji)',
        slug: 'tirupati-balaji-temple-venkateswara',
        description: 'Perched on the Venkatadri peak of the Seshachalam Hills in Tirumala, this sacred Vaishnavite shrine is dedicated to Lord Venkateswara (an incarnation of Lord Vishnu), lovingly worshipped as Balaji and Govinda.',
        history: 'The temple has ancient origins documented in the Sangam epics and received generous endowments from the Pallavas, Cholas, and particularly the Vijayanagara Emperor Sri Krishna Devaraya in the early 16th century. It is managed by Tirumala Tirupati Devasthanams (TTD).',
        deity: 'Lord Venkateswara (Balaji / Srinivasa)',
        location: {
          state: 'Andhra Pradesh',
          city: 'Tirupati',
          address: 'S Mada St, Tirumala, Tirupati, Andhra Pradesh 517504',
          coordinates: { lat: 13.6833, lng: 79.3472 }
        },
        rituals: [
          { name: 'Suprabhatam', time: '03:00 AM', description: 'Waking the Lord with sacred chants by Vedic scholars.' },
          { name: 'Thomala Seva', time: '03:45 AM', description: 'Flower adornment seva for the holy deity.' },
          { name: 'Archana', time: '04:30 AM', description: 'Chanting of Sahasranamavali (1,008 divine names).' },
          { name: 'Ekantha Seva', time: '01:00 AM', description: 'Night lullaby (Jo Achyutananda) concluding the daily worship.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:30 PM',
          evening: '02:30 PM – 11:30 PM',
          specialTimings: 'Operates up to 20 hours a day through Sarva Darshan and Special Entry queues'
        },
        festivals: brahmotsavamId ? [brahmotsavamId] : [],
        visitorGuidelines: {
          dressCode: 'Strict traditional dress code enforced. Men: Dhoti with angavastram or Kurta-pyjama. Women: Saree, half-saree, or Chudidar with Dupatta. Western clothes are strictly barred.',
          photographyRules: 'Strictly prohibited. All electronics and cameras must be deposited at TTD security scanning centers.',
          footwearRules: 'Footwear is not permitted on the sacred four Mada Streets and inside the sanctum precincts.',
          generalBehavior: 'Adhere to queue tokens. Consume the sacred Tirupati Laddu Prasadam with devotion.'
        },
        nearbyFacilities: {
          accommodation: ['TTD Srinivasam Complex', 'TTD Madhavam Yatri Niwas', 'Fortune Select Grand Ridge Tirupati'],
          transportation: ['Tirupati Main Railway Station (26 km via ghat road)', 'Tirupati International Airport (Renyagunta, 38 km)', 'Frequent TTD electric bus fleet'],
          food: ['TTD Nitya Annadanam Hall (Free vegetarian meals for all)', 'Bhimas Deluxe', 'Saravana Bhavan']
        },
        category: 'Divya Desam',
        featured: true,
        popular: true,
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Tirupati_balaji_gopuram.jpg/1280px-Tirupati_balaji_gopuram.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Kedarnath Temple',
        slug: 'kedarnath-temple-uttarakhand',
        description: 'Nestled at an elevation of 3,583 meters in the Garhwal Himalayas near the Mandakini River, Kedarnath is one of the twelve Jyotirlingas of Lord Shiva and the foremost of the Panch Kedar shrines.',
        history: 'Historical traditions link its establishment to the Pandavas of the Mahabharata looking for absolution from Lord Shiva. In the 8th century CE, the revered philosopher-saint Adi Shankaracharya revived the temple. The grey stone structure survived the catastrophic 2013 flash floods almost unscathed.',
        deity: 'Lord Shiva (Sadashiva)',
        location: {
          state: 'Uttarakhand',
          city: 'Kedarnath, Rudraprayag',
          address: 'Kedarnath, Rudraprayag District, Uttarakhand 246445',
          coordinates: { lat: 30.7352, lng: 79.0669 }
        },
        rituals: [
          { name: 'Maha Abhishek', time: '04:00 AM – 06:00 AM', description: 'Early morning sacred milk and holy herb bath.' },
          { name: 'Shringar Pooja', time: '06:00 PM – 07:30 PM', description: 'Evening floral decoration and aarti.' }
        ],
        darshanTimings: {
          morning: '05:00 AM – 01:30 PM',
          evening: '05:30 PM – 09:00 PM',
          specialTimings: 'Temple is open seasonally from Akshaya Tritiya (April/May) until Kartik Purnima / Bhai Dooj (October/November).'
        },
        festivals: shivaratriId ? [shivaratriId] : [],
        visitorGuidelines: {
          dressCode: 'Heavy woolen clothing is necessary due to sub-zero temperatures. Modest attire is required inside the sanctum.',
          photographyRules: 'Photography is prohibited inside the inner garbhagriha.',
          footwearRules: 'Footwear must be taken off at the temple platform steps.',
          generalBehavior: 'Mandatory biometric registration at Haridwar/Rishikesh/Sonprayag before embarking on the 16 km trek from Gaurikund.'
        },
        nearbyFacilities: {
          accommodation: ['GMVN Tourist Bungalow Kedarnath', 'Pre-fabricated Camps Kedarnath', 'Lodge facilities at Lincholi & Gaurikund'],
          transportation: ['16 km pedestrian/pony/palki trek from Gaurikund', 'Helicopter services from Phata, Guptkashi, and Sirsi', 'Nearest railhead: Rishikesh (216 km)'],
          food: ['GMVN Canteens', 'Local pilgrim bhojanalayas providing hot dal, roti, and khichdi']
        },
        category: 'Char Dham',
        featured: true,
        popular: true,
        images: [
          '/images/temples/kedarnath_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Brihadeeswarar Temple (Big Temple)',
        slug: 'brihadeeswarar-temple-thanjavur',
        description: 'A monument to supreme Chola imperial engineering, this UNESCO World Heritage Site dedicated to Lord Shiva features one of the tallest granite temple towers (Vimana) in the world, crowned by an 80-tonne monolithic stone dome.',
        history: 'Commissioned by the Great Chola Emperor Rajaraja I between 985 and 1010 CE. Built entirely of granite without binding mortar, utilizing interlocking stone architecture that has withstood six major earthquakes over a millennium.',
        deity: 'Lord Shiva (Peruvudaiyar)',
        location: {
          state: 'Tamil Nadu',
          city: 'Thanjavur',
          address: 'Membalam Rd, Balaganapathy Nagar, Thanjavur, Tamil Nadu 613007',
          coordinates: { lat: 10.7828, lng: 79.1318 }
        },
        rituals: [
          { name: 'Kaala Sandhi', time: '08:30 AM', description: 'Morning worship with Vedic hymn recitations.' },
          { name: 'Uchikkaalam', time: '12:00 PM', description: 'Noon worship to the colossal monolithic Shiva Lingam.' },
          { name: 'Sayaratchai', time: '06:00 PM', description: 'Evening deeparadhana lighting.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:30 PM',
          evening: '04:00 PM – 09:00 PM',
          specialTimings: 'Special Pradosham abhishekam to the colossal Nandi bull twice every month.'
        },
        festivals: shivaratriId ? [shivaratriId] : [],
        visitorGuidelines: {
          dressCode: 'Modest Indian attire recommended. Shoulders and knees must be covered.',
          photographyRules: 'Photography allowed in the massive outer courtyard; strictly restricted inside the inner sanctum.',
          footwearRules: 'Leave footwear at the designated counter outside the primary outer fortification walls.',
          generalBehavior: 'Do not touch the ancient inscriptions or fresco murals on the corridor walls.'
        },
        nearbyFacilities: {
          accommodation: ['Hotel Gnanam', 'Svatma Thanjavur (Heritage Luxury)', 'Hotel Tamil Nadu TTDC'],
          transportation: ['Thanjavur Junction Railway Station (1.5 km)', 'Tiruchirappalli International Airport (58 km)', 'Old Bus Stand (1 km)'],
          food: ['Sathars Pure Veg', 'Sri Lakshmi Mess', 'Dharani Restaurant']
        },
        category: 'UNESCO World Heritage',
        featured: true,
        popular: false,
        images: [
          '/images/temples/brihadeeswarar_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Somnath Temple',
        slug: 'somnath-temple-gujarat',
        description: 'Regarded as the first among the twelve sacred Jyotirlinga shrines of Lord Shiva, Somnath stands magnificently on the western coast of Gujarat overlooking the Arabian Sea at Prabhas Patan.',
        history: 'Known traditionally as "The Shrine Eternal", the temple survived repeated historical desecrations and was reconstructed seven times. The present magnificent temple in the Chalukya/Solanki architectural style was built in 1951, spearheaded by Sardar Vallabhbhai Patel.',
        deity: 'Lord Shiva (Someshwar)',
        location: {
          state: 'Gujarat',
          city: 'Prabhas Patan, Veraval',
          address: 'Somnath Mandir Road, Prabhas Patan, Gujarat 362268',
          coordinates: { lat: 20.8880, lng: 70.4012 }
        },
        rituals: [
          { name: 'Pratah Aarti', time: '07:00 AM', description: 'Morning conch shell blowing and camphor aarti.' },
          { name: 'Madhyan Aarti', time: '12:00 PM', description: 'Noon prayer service.' },
          { name: 'Sandhya Aarti', time: '07:00 PM', description: 'Evening aarti accompanied by rhythmic bell clanging.' },
          { name: 'Sound & Light Show', time: '08:00 PM', description: 'Illumination program detailing the glorious history of Somnath.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 11:30 AM',
          evening: '12:30 PM – 10:00 PM',
          specialTimings: 'Open continuously throughout the day on Maha Shivaratri and Karthik Purnima.'
        },
        festivals: shivaratriId ? [shivaratriId] : [],
        visitorGuidelines: {
          dressCode: 'Modest and traditional clothing. Bermudas, half-pants, and short skirts are strictly disallowed.',
          photographyRules: 'Mobile phones, cameras, leather bags, and smart watches must be submitted at the free high-tech cloakroom lockers.',
          footwearRules: 'Free shoe stalls are situated at the temple entrance plaza.',
          generalBehavior: 'Observe silence in the coastal parikrama pathway.'
        },
        nearbyFacilities: {
          accommodation: ['Somnath Trust Sagar Darshan Guest House', 'Liluvali Guest House', 'The Fern Residency Somnath'],
          transportation: ['Veraval Railway Station (6 km)', 'Diu Airport (85 km)', 'Rajkot Airport (195 km)'],
          food: ['Somnath Trust Bhojanalaya (Authentic Gujarati Thali)', 'Aditya Restaurant', 'Hotel Sagar']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: true,
        images: [
          '/images/temples/somnath_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Konark Sun Temple',
        slug: 'konark-sun-temple-odisha',
        description: 'A 13th-century CE architectural triumph dedicated to the Sun God Surya, crafted in the shape of a monumental chariot with 24 intricately carved stone wheels drawn by seven horses on the Bay of Bengal coast.',
        history: 'Constructed around 1250 CE by King Narasimhadeva I of the Eastern Ganga Dynasty. European sailors once referred to it as the "Black Pagoda". A designated UNESCO World Heritage Site renowned for its sundial wheels that accurately calculate time down to the minute.',
        deity: 'Lord Surya (Sun God)',
        location: {
          state: 'Odisha',
          city: 'Konark',
          address: 'Konark, Puri District, Odisha 752111',
          coordinates: { lat: 19.8876, lng: 86.0945 }
        },
        rituals: [
          { name: 'Heritage Sunrise Viewing', time: '06:00 AM', description: 'Catch the first rays of the rising sun striking the stone sanctum.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:00 PM',
          evening: '12:00 PM – 08:00 PM',
          specialTimings: 'Special evening illumination and classical Konark Dance Festival in December.'
        },
        festivals: diwaliId ? [diwaliId] : [],
        visitorGuidelines: {
          dressCode: 'Comfortable, respectful tourist and pilgrim attire.',
          photographyRules: 'Photography is permitted throughout the monument grounds. Drone photography requires ASI authorization.',
          footwearRules: 'Footwear allowed in the general grounds; removal required on elevated sacred plinths.',
          generalBehavior: 'Do not climb or deface the ancient stone relief sculptures.'
        },
        nearbyFacilities: {
          accommodation: ['OTDC Panthanivas Konark', 'Lotus Eco Resort Konark', 'Surya Inn'],
          transportation: ['Puri Railway Station (35 km)', 'Biju Patnaik International Airport Bhubaneswar (65 km)', 'National Highway 316'],
          food: ['Kamath Restaurant Konark', 'OTDC Restaurant', 'Geetanjali Pure Veg']
        },
        category: 'UNESCO World Heritage',
        featured: true,
        popular: false,
        images: [
          '/images/temples/konark_sun_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Jagannath Temple (Puri)',
        slug: 'jagannath-temple-puri-odisha',
        description: 'One of the four cardinal Char Dham shrines of Hinduism, enshrining Lord Jagannath, his brother Balabhadra, and sister Subhadra in ancient neem-wood deity forms in the holy coastal city of Puri.',
        history: 'Built by King Anantavarman Chodaganga of the Eastern Ganga Dynasty in the 12th century CE. Renowned for its mysterious architectural marvels, the sacred Anandabazar (world\'s largest outdoor kitchen), and the monumental annual Ratha Yatra.',
        deity: 'Lord Jagannath, Balabhadra & Subhadra',
        location: {
          state: 'Odisha',
          city: 'Puri',
          address: 'Grand Road, Puri, Odisha 752001',
          coordinates: { lat: 19.8049, lng: 85.8179 }
        },
        rituals: [
          { name: 'Mangala Alati', time: '05:30 AM', description: 'Early morning waking lamps.' },
          { name: 'Mailam & Abhisheka', time: '06:00 AM', description: 'Changing the robes and sacred offering.' },
          { name: 'Madhyanha Dhupa', time: '12:30 PM – 01:30 PM', description: 'Midday grand Mahaprasad naivedyam.' },
          { name: 'Badasinghara Bhoga & Sayana', time: '11:00 PM', description: 'Night musical offering and retirement.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:30 PM',
          evening: '03:30 PM – 11:00 PM',
          specialTimings: 'Special opening times during Snana Yatra and Navakalebara.'
        },
        festivals: rathYatraId ? [rathYatraId] : [],
        visitorGuidelines: {
          dressCode: 'Strict traditional attire. Jeans and revealing clothes are barred. Leather items (belts, wallets) are strictly forbidden.',
          photographyRules: 'Strictly prohibited. All electronics must be deposited before entering the Singhadwara (Lion Gate).',
          footwearRules: 'Footwear strictly disallowed within the Meghnad Pacheri outer boundary wall.',
          generalBehavior: 'Non-Hindus can view the temple exterior and museum; inner sanctum entry adheres to traditional temple customs.'
        },
        nearbyFacilities: {
          accommodation: ['OTDC Panthanivas Puri', 'Mayfair Waves Puri', 'Sterling Puri', 'Puri Yatri Niwas'],
          transportation: ['Puri Railway Station (2.5 km)', 'Bhubaneswar Airport (60 km)', 'Grand Road Tuktuks'],
          food: ['Ananda Bazar (Authentic Sacred Mahaprasad / Abadha)', 'Wildgrass Restaurant', 'Chung Wah']
        },
        category: 'Char Dham',
        featured: false,
        popular: true,
        images: [
          '/images/temples/jagannath_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Ramanathaswamy Temple',
        slug: 'ramanathaswamy-temple-rameswaram',
        description: 'Situated on Rameswaram island in the Gulf of Mannar, this sacred shrine is both a Char Dham site and one of the 12 Jyotirlingas, famous for having the longest sculptured stone pillared corridor in the world.',
        history: 'According to the Ramayana, Lord Rama consecrated and prayed to Lord Shiva here before crossing to Lanka. The massive temple complex with over 1,200 intricately carved granite pillars and 22 sacred teerthams was expanded by the Sethupathi kings of Ramnad in the 12th century.',
        deity: 'Lord Shiva (Ramanathaswamy) & Goddess Parvathavardhini',
        location: {
          state: 'Tamil Nadu',
          city: 'Rameswaram',
          address: 'Rameswaram, Ramanathapuram District, Tamil Nadu 623526',
          coordinates: { lat: 9.2881, lng: 79.3174 }
        },
        rituals: [
          { name: 'Spadika Linga Darshan', time: '05:00 AM – 06:00 AM', description: 'Early morning darshan of the sacred crystal lingam given by Adi Shankaracharya.' },
          { name: '22 Theertham Holy Bath', time: '06:00 AM – 12:00 PM', description: 'Traditional bath across 22 sweet-water wells within the temple precincts.' },
          { name: 'Sayaratchai Pooja', time: '06:30 PM', description: 'Evening prayer.' }
        ],
        darshanTimings: {
          morning: '05:00 AM – 01:00 PM',
          evening: '03:00 PM – 09:00 PM',
          specialTimings: 'Maha Shivaratri night and Aadi Amavasya witness thousands of bathing pilgrims.'
        },
        festivals: shivaratriId ? [shivaratriId] : [],
        visitorGuidelines: {
          dressCode: 'Traditional Indian attire. Men: Dhoti or pants with shirt. Women: Saree or churidar. Wet clothes from teertham bath must be changed before entering the sanctum.',
          photographyRules: 'Photography prohibited in sanctum and theertham areas.',
          footwearRules: 'Footwear not allowed within temple corridors.',
          generalBehavior: 'Change rooms are available after the holy 22 wells bath.'
        },
        nearbyFacilities: {
          accommodation: ['TTDC Hotel Tamil Nadu Rameswaram', 'Hotel Daiwik Rameswaram', 'Ramanatha Swamy Pilgrims Shed'],
          transportation: ['Rameswaram Railway Station (1.2 km)', 'Madurai Airport (175 km)', 'Pamban Sea Bridge roadway'],
          food: ['Hotel Saravana Pure Veg', 'Sri Murugan Mess', 'Temple Annadhanam']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: true,
        images: [
          '/images/temples/ramanathaswamy_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Shree Siddhivinayak Ganapati Temple',
        slug: 'shree-siddhivinayak-temple-mumbai',
        description: 'One of the most revered and iconic Ganesha temples in western India, situated in Prabhadevi, Mumbai. The sanctum houses an idol of Lord Ganesha carved from a single black stone with the trunk tilted to the right (Siddhi-Vinayak).',
        history: 'Originally consecrated on 19 November 1801 by Laxman Vithu and funded by Deubai Patil, a devout childless woman wishing to help other childless mothers. Rebuilt into a modern multi-tiered gold-crowned complex in 1993.',
        deity: 'Lord Ganesha (Siddhivinayak)',
        location: {
          state: 'Maharashtra',
          city: 'Mumbai',
          address: 'SK Bole Rd, Prabhadevi, Mumbai, Maharashtra 400028',
          coordinates: { lat: 19.0168, lng: 72.8303 }
        },
        rituals: [
          { name: 'Kakad Aarti', time: '05:30 AM', description: 'Early morning awakening prayer.' },
          { name: 'Shree Darshan', time: '06:00 AM – 12:15 PM', description: 'Continuous general darshan.' },
          { name: 'Maha Aarti', time: '07:30 PM', description: 'Grand evening devotional service.' },
          { name: 'Shejarati', time: '09:50 PM', description: 'Final prayer before closing.' }
        ],
        darshanTimings: {
          morning: '05:30 AM – 12:15 PM',
          evening: '03:15 PM – 10:00 PM',
          specialTimings: 'Open from 03:15 AM on Angaraki Chaturthi and Tuesdays'
        },
        festivals: diwaliId ? [diwaliId] : [],
        visitorGuidelines: {
          dressCode: 'Modest Western or Indian attire. Shorts and sleeveless tops are discouraged.',
          photographyRules: 'Photography allowed in outer premises; prohibited in the sanctum.',
          footwearRules: 'Footwear counters available at temple gates.',
          generalBehavior: 'Queue times can exceed 3 hours on Tuesdays and festivals; online booking is recommended.'
        },
        nearbyFacilities: {
          accommodation: ['ITC Grand Central Parel', 'The St. Regis Mumbai', 'Hotel City Point Dadar'],
          transportation: ['Dadar Railway Station (2 km)', 'Chhatrapati Shivaji Maharaj International Airport (13 km)', 'Prabhadevi Bus Station'],
          food: ['Prakash Shakahari Upahar Kendra', 'Aaswad Upahar', 'Siddhivinayak Prasadam stall (Modak & Ladoo)']
        },
        category: 'Cave & Rock-Cut',
        featured: false,
        popular: true,
        images: [
          '/images/temples/siddhivinayak_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Padmanabhaswamy Temple',
        slug: 'padmanabhaswamy-temple-thiruvananthapuram',
        description: 'An architectural marvel in Thiruvananthapuram blending Kerala and Dravidian styles, dedicated to Lord Vishnu in the eternal cosmic sleep posture (Anantha Shayana) reclining on the five-hooded serpent Adishesha.',
        history: 'Revered in the ancient Sangam and Tamil Alvar hymns (6th–9th centuries CE) as one of the 108 sacred Divya Desams. Extensively restored and endowed by King Marthanda Varma of Travancore in 1750, who surrendered his kingdom to the deity as Padmanabha Dasa.',
        deity: 'Lord Vishnu (Padmanabhaswamy)',
        location: {
          state: 'Kerala',
          city: 'Thiruvananthapuram',
          address: 'West Nada, Fort, East Fort, Thiruvananthapuram, Kerala 695023',
          coordinates: { lat: 8.4828, lng: 76.9436 }
        },
        rituals: [
          { name: 'Nirmalyam Darshanam', time: '03:15 AM – 04:15 AM', description: 'Early morning holy darshan with flower garlands from previous night.' },
          { name: 'Usha Pooja', time: '06:30 AM – 07:00 AM', description: 'Morning worship ritual offering sacred prasadam.' },
          { name: 'Deeparadhana', time: '06:45 PM – 07:20 PM', description: 'Evening lighting of thousands of bronze oil lamps.' }
        ],
        darshanTimings: {
          morning: '03:15 AM – 12:00 PM',
          evening: '05:00 PM – 08:30 PM',
          specialTimings: 'Entry pauses briefly during internal royal pooja ceremonies'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict Kerala traditional dress. Men: Plain white Mundu/Dhoti around the waist (bare torso, no shirts or vests). Women: Traditional Saree or Dhavani/Set-mundu.',
          photographyRules: 'Strictly prohibited inside the fortification perimeter. Electronics and phones must be deposited in cloakrooms.',
          footwearRules: 'Footwear strictly disallowed within the entire fort temple complex.',
          generalBehavior: 'Adhere to peaceful queue lines. Non-Hindus can admire the gopuram and surrounding heritage pond from outer gates.'
        },
        nearbyFacilities: {
          accommodation: ['KTDC Chaithram Trivandrum', 'The South Park Hotel', 'Biverah Hotel & Suites'],
          transportation: ['Thiruvananthapuram Central Railway Station (1 km)', 'Trivandrum International Airport (4 km)', 'East Fort City Bus Stand (300 m)'],
          food: ['Mothers Veg Plaza', 'Ariya Nivaas Pure Veg', 'Sree Padmanabha Temple Annadanam']
        },
        category: 'Divya Desam',
        featured: true,
        popular: true,
        images: [
          '/images/temples/padmanabhaswamy_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Harmandir Sahib (Golden Temple)',
        slug: 'golden-temple-harmandir-sahib-amritsar',
        description: 'The preeminent spiritual and cultural sanctuary of Sikhism, situated in the holy city of Amritsar. The sanctum stands majestically in the center of the sacred Amrit Sarovar lake, covered in gold foil that shimmers under day and night light.',
        history: 'Founded in 1577 by Guru Ram Das, the fourth Sikh Guru. The foundation stone was laid by the Sufi saint Hazrat Mian Mir of Lahore in 1589. Rebuilt with gilded copper by Maharaja Ranjit Singh in 1830. Operates the world\'s largest free community kitchen (Langar).',
        deity: 'The Supreme Divine (Guru Granth Sahib Ji)',
        location: {
          state: 'Punjab',
          city: 'Amritsar',
          address: 'Golden Temple Road, Atta Mandi, Amritsar, Punjab 143006',
          coordinates: { lat: 31.6200, lng: 74.8765 }
        },
        rituals: [
          { name: 'Prakash Ceremony', time: '04:00 AM', description: 'Ceremonial arrival of Sri Guru Granth Sahib from Akal Takht to Harmandir Sahib.' },
          { name: 'Gurbani Kirtan', time: 'Continuous', description: 'Soulful live singing of sacred Gurbani hymns from dawn to night.' },
          { name: 'Sukhasan Ceremony', time: '10:00 PM', description: 'Night palanquin procession carrying Sri Guru Granth Sahib back to Akal Takht.' }
        ],
        darshanTimings: {
          morning: '03:00 AM – 12:00 PM',
          evening: '12:00 PM – 11:00 PM',
          specialTimings: 'Open 24 hours daily to all individuals regardless of religion, caste, or background'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Head must be covered at all times (scarves/rumals available free at entrance). Modest attire covering shoulders and legs.',
          photographyRules: 'Photography allowed around the Parikrama (outer walkway); strictly forbidden inside the inner sanctum.',
          footwearRules: 'Footwear must be deposited at free Jora Ghar counters. Feet must be cleansed in shallow water channel before stepping onto marble.',
          generalBehavior: 'Tobacco, alcohol, and intoxicating items are strictly prohibited within the complex perimeter.'
        },
        nearbyFacilities: {
          accommodation: ['Sri Guru Ramdas Niwas (Sarai inside complex)', 'Hyatt Regency Amritsar', 'Radisson Blu Amritsar'],
          transportation: ['Amritsar Junction Railway Station (2 km)', 'Sri Guru Ram Dass Jee International Airport (13 km)', 'Free SGPC shuttle buses from railway station'],
          food: ['Guru Ka Langar (24/7 free sanctified meals for 100,000+ daily)', 'Bhai Kulwant Singh Kulchian', 'Kesar Da Dhaba']
        },
        category: 'UNESCO World Heritage',
        featured: true,
        popular: true,
        images: [
          '/images/temples/golden_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Virupaksha Temple (Hampi)',
        slug: 'virupaksha-temple-hampi-karnataka',
        description: 'The crowning architectural glory of the UNESCO World Heritage Site of Hampi, located on the southern bank of the Tungabhadra River. Dedicated to Lord Shiva as Virupaksha, it has functioned as an uninterrupted living temple since the 7th century CE.',
        history: 'Expanded dramatically during the glorious Vijayanagara Empire, particularly by King Sri Krishna Devaraya in 1510 CE who added the towering 50-meter eastern gopuram and the intricate ranga mandapa.',
        deity: 'Lord Shiva (Virupaksha) & Goddess Pampa',
        location: {
          state: 'Karnataka',
          city: 'Hampi',
          address: 'Hampi Bazaar, Hampi, Vijayanagara District, Karnataka 583239',
          coordinates: { lat: 15.3350, lng: 76.4600 }
        },
        rituals: [
          { name: 'Pratah Pooja', time: '06:00 AM – 07:30 AM', description: 'Morning mangalarathi and offering.' },
          { name: 'Temple Elephant Blessing', time: '08:00 AM – 09:30 AM', description: 'Temple elephant Lakshmi blesses visiting devotees after morning bath.' },
          { name: 'Sandhya Pooja', time: '06:30 PM – 08:00 PM', description: 'Evening lamp lighting across the ancient stone pillars.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:00 PM',
          evening: '05:00 PM – 09:00 PM',
          specialTimings: 'Annual chariot festival (Kalyanotsavam) in February/March'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Comfortable, modest clothing covering shoulders and knees. Sun hats recommended for Hampi terrain.',
          photographyRules: 'Permitted in outer courtyards and pillared pavilions; restricted inside the central sanctum.',
          footwearRules: 'Shoe stalls situated outside the primary eastern gopuram.',
          generalBehavior: 'Observe the historic pinhole camera optical phenomenon room showing inverted gopuram shadow.'
        },
        nearbyFacilities: {
          accommodation: ['KSTDC Hotel Mayura Bhuvaneshwari Kamalapur', 'Heritage Resort Hampi', 'Evolve Back Kamalapura Palace'],
          transportation: ['Hospet Junction Railway Station (13 km)', 'Jindal Vijaynagar Airport Vidyanagar (35 km)', 'Hubballi Airport (145 km)'],
          food: ['Mango Tree Restaurant Hampi', 'Taste of Hampi Pure Veg', 'Gopi Guest House Restaurant']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/virupaksha_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Kamakhya Temple',
        slug: 'kamakhya-temple-guwahati-assam',
        description: 'Perched atop the Nilachal Hill in Guwahati overlooking the Brahmaputra River, Kamakhya is the most venerated of the 51 Shakti Peethas. The sanctum houses no idol, enshrining instead a natural underground rock fissure shaped like a yoni bathed by natural spring water.',
        history: 'Celebrates the divine feminine power of creation. The present hybrid Nilachal-style temple with its beehive-shaped dome was rebuilt in 1565 CE by King Naranarayan of the Koch dynasty after historical destructions.',
        deity: 'Goddess Kamakhya (Adi Parashakti)',
        location: {
          state: 'Assam',
          city: 'Guwahati',
          address: 'Kamakhya, Guwahati, Kamrup Metropolitan, Assam 781010',
          coordinates: { lat: 26.1664, lng: 91.7054 }
        },
        rituals: [
          { name: 'Kapaat Khula (Door Opening)', time: '05:30 AM', description: 'Snana of the sanctum with sacred spring waters.' },
          { name: 'Nitya Pooja', time: '08:00 AM – 01:00 PM', description: 'Devotee touch-darshan (Sparsha Darshan) and kumkum offerings.' },
          { name: 'Bhog Aarti', time: '02:00 PM – 02:30 PM', description: 'Sacred Mahaprasad offering.' }
        ],
        darshanTimings: {
          morning: '05:30 AM – 01:00 PM',
          evening: '02:30 PM – 05:30 PM',
          specialTimings: 'Temple closes for three days during the annual Ambubachi Mela in June'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest Indian attire recommended. Saree, suit, or dhoti-kurta preferred for sanctum descent.',
          photographyRules: 'Strictly prohibited inside the subterranean Garbhagriha cave; outer complex photography allowed.',
          footwearRules: 'Shoe counters available at the top parking plinth.',
          generalBehavior: 'Descent into sanctum requires navigating steep stone steps in dim natural light; follow temple servitor cues.'
        },
        nearbyFacilities: {
          accommodation: ['Radisson Blu Hotel Guwahati', 'Kiranshree Portico', 'Prashanti Tourist Lodge Kamakhya'],
          transportation: ['Kamakhya Railway Station (3 km)', 'Lokpriya Gopinath Bordoloi International Airport (20 km)', 'Guwahati Junction (6 km)'],
          food: ['Maa Kamakhya Bhojanalaya', 'Paradise Assamese Heritage Restaurant', 'Bidyut Cafe Pure Veg']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/kamakhya_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Mahabodhi Temple',
        slug: 'mahabodhi-temple-bodh-gaya-bihar',
        description: 'A designated UNESCO World Heritage Site in Bodh Gaya, marking the most sacred pilgrimage destination for Buddhists worldwide. It marks the exact location where Siddhartha Gautama attained supreme enlightenment (Bodhi) under the sacred Bodhi Tree in 528 BCE.',
        history: 'The first temple was constructed by Emperor Ashoka the Great in the 3rd century BCE. The current monumental 55-meter brick tower dates from the 5th–6th centuries CE during the classical Gupta period and is one of the oldest all-brick structures surviving in eastern India.',
        deity: 'Gautama Buddha (Supreme Enlightened One)',
        location: {
          state: 'Bihar',
          city: 'Bodh Gaya',
          address: 'Bodh Gaya, Gaya District, Bihar 824231',
          coordinates: { lat: 24.6960, lng: 84.9914 }
        },
        rituals: [
          { name: 'Morning Chanting & Meditation', time: '05:00 AM – 06:30 AM', description: 'Monks and practitioners from international monasteries chant under the Bodhi Tree.' },
          { name: 'Holy Robe Offering (Chivar)', time: '09:00 AM', description: 'Ceremonial offering of silk robes to the golden Buddha inside the sanctum.' },
          { name: 'Evening Candle Lighting', time: '06:00 PM – 08:30 PM', description: 'Circumambulation with thousands of lotus butter lamps illuminating the courtyard.' }
        ],
        darshanTimings: {
          morning: '05:00 AM – 12:00 PM',
          evening: '12:00 PM – 09:00 PM',
          specialTimings: 'Open continuously throughout Buddha Purnima day'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest and quiet attire. Shoulders, chest, and knees must be respectfully covered.',
          photographyRules: 'Mobile phones are completely prohibited inside the inner complex to preserve meditative silence. Camera ticket permits DSLR cameras in outer garden.',
          footwearRules: 'Footwear must be deposited at the entrance cloaking counter.',
          generalBehavior: 'Maintain absolute silence and serenity. Walk in clockwise direction around the Bodhi Tree.'
        },
        nearbyFacilities: {
          accommodation: ['Bodhgaya Regency Hotel', 'Marasa Sarovar Premiere', 'Root Institute Guest House'],
          transportation: ['Gaya International Airport (10 km)', 'Gaya Junction Railway Station (16 km)', 'Patna Airport (110 km)'],
          food: ['Sujata Restaurant', 'Mohammad Pure Veg Cafe', 'Be Happy Cafe Bodhgaya']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/mahabodhi_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Kandariya Mahadeva Temple (Khajuraho)',
        slug: 'kandariya-mahadeva-temple-khajuraho',
        description: 'The largest, most ornate, and architecturally supreme Hindu temple among the Western Group of Khajuraho monuments in Madhya Pradesh. Celebrated globally for its breathtaking Nagara-style stone shikhara resembling the sacred mountain peaks of Mount Kailash.',
        history: 'Commissioned circa 1030 CE by King Vidyadhara of the Chandela dynasty to celebrate his military triumph over Mahmud of Ghazni. Declared a UNESCO World Heritage Site, it features over 800 intricately carved sandstone figures depicting celestial beings, dancers, and cosmic harmony.',
        deity: 'Lord Shiva (Mahadeva)',
        location: {
          state: 'Madhya Pradesh',
          city: 'Khajuraho',
          address: 'Western Group of Temples, Sevagram, Khajuraho, Madhya Pradesh 471606',
          coordinates: { lat: 24.8530, lng: 79.9195 }
        },
        rituals: [
          { name: 'Heritage Sunrise Walk', time: '06:00 AM', description: 'Early morning rays illuminate the sandstone carvings with golden hue.' },
          { name: 'Sound and Light Spectacle', time: '07:30 PM', description: 'Evening narrative on Chandela dynasty architectural legacy.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:00 PM',
          evening: '12:00 PM – 06:00 PM',
          specialTimings: 'Annual Khajuraho Dance Festival in February brings top classical dancers'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest comfortable tourist and pilgrim attire.',
          photographyRules: 'Photography allowed throughout the monument complex. Drones require ASI permission.',
          footwearRules: 'Shoes must be removed before climbing the high jagati plinth steps.',
          generalBehavior: 'Do not touch or lean against ancient carved friezes.'
        },
        nearbyFacilities: {
          accommodation: ['The Lalit Temple View Khajuraho', 'Radisson Jass Hotel Khajuraho', 'Hotel Chandela'],
          transportation: ['Khajuraho Airport (5 km)', 'Khajuraho Railway Station (8 km)', 'Jhansi Junction (175 km)'],
          food: ['Raja Cafe Khajuraho', 'Badri Seth Pure Veg Restaurant', 'Mediterraneo']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/kandariya_mahadeva_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Badrinath Temple',
        slug: 'badrinath-temple-uttarakhand',
        description: 'Perched at an elevation of 3,133 meters along the roaring Alaknanda River in the Chamoli Himalayas, Badrinath is the most important of the four cardinal Char Dham shrines and the foremost of the 108 Vaishnavite Divya Desams.',
        history: 'Consecrated originally by Adi Shankaracharya in the 8th century CE, who recovered the sacred black saligram stone idol of Lord Badri Narayan from the Narad Kund spring. Framed dramatically by the majestic Nar and Narayana mountain ranges.',
        deity: 'Lord Vishnu (Badrinath / Badri Narayan)',
        location: {
          state: 'Uttarakhand',
          city: 'Badrinath, Chamoli',
          address: 'Badripur, Badrinath, Chamoli District, Uttarakhand 246422',
          coordinates: { lat: 30.7447, lng: 79.4912 }
        },
        rituals: [
          { name: 'Maha Abhishek & Geeta Path', time: '04:30 AM – 06:30 AM', description: 'Early morning holy bath with milk, curd, and holy scents.' },
          { name: 'Shringaar Darshan', time: '07:30 AM', description: 'Darshan of the Lord adorned with sandalwood paste and golden crown.' },
          { name: 'Shayan Aarti', time: '08:30 PM – 09:00 PM', description: 'Night closing prayer chanted by the head Nambudiri priest (Rawal).' }
        ],
        darshanTimings: {
          morning: '04:30 AM – 01:00 PM',
          evening: '04:00 PM – 09:00 PM',
          specialTimings: 'Open seasonally from April/May (Akshaya Tritiya) until November (Bhatridwitiya)'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Heavy woolen clothing is indispensable. Decent attire covering body completely inside sanctum.',
          photographyRules: 'Strictly prohibited inside the sanctum sanctorum.',
          footwearRules: 'Footwear to be removed outside the primary temple gate.',
          generalBehavior: 'Devotees customarily take a holy dip in the natural sulfur hot spring (Tapt Kund) before temple entry.'
        },
        nearbyFacilities: {
          accommodation: ['Sarovar Portico Badrinath', 'GMVN Tourist Rest House Devlok Badrinath', 'Narayan Palace Hotel'],
          transportation: ['Motorable NH-7 road up to temple gate', 'Helipad at Badrinath for helicopter shuttles from Dehradun', 'Rishikesh Railway Station (295 km)'],
          food: ['Maa Ambey Bhojanalaya', 'Saket Pure Veg Restaurant', 'GMVN Canteen']
        },
        category: 'Char Dham',
        featured: true,
        popular: true,
        images: [
          '/images/temples/badrinath_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Swaminarayan Akshardham',
        slug: 'swaminarayan-akshardham-new-delhi',
        description: 'A breathtaking spiritual and cultural campus in New Delhi showcasing ten thousand years of Indian art, spirituality, and timeless architecture. The monument was built entirely of Rajasthani pink sandstone and Italian Carrara marble without any structural steel.',
        history: 'Inaugurated on 6 November 2005 by Pramukh Swami Maharaj, President APJ Abdul Kalam, and Prime Minister Manmohan Singh. Crafted by 7,000 master artisans and 4,000 volunteers following ancient Shilpa Shastra guidelines.',
        deity: 'Bhagwan Swaminarayan',
        location: {
          state: 'Delhi',
          city: 'New Delhi',
          address: 'NH 24, Pramukh Swami Maharaj Marg, New Delhi, Delhi 110092',
          coordinates: { lat: 28.6127, lng: 77.2773 }
        },
        rituals: [
          { name: 'Mangala Aarti', time: '06:00 AM', description: 'Early morning waking prayer.' },
          { name: 'Sahaj Anand Water Show', time: '07:15 PM – 08:00 PM', description: 'Breathtaking multimedia water and laser spectacle bringing Vedic stories alive.' }
        ],
        darshanTimings: {
          morning: '09:30 AM – 01:00 PM',
          evening: '01:00 PM – 08:00 PM',
          specialTimings: 'Closed on Mondays. Exhibitions run from 10:00 AM to 06:00 PM'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict modest dress code: upper wear must cover chest, shoulders, and navel; lower wear must cover below the knees. Wraps available at security.',
          photographyRules: 'All electronic gadgets, cameras, smartwatches, and phones must be deposited in the secure free cloakroom before entry.',
          footwearRules: 'Free shoe stalls at the main mandir entrance.',
          generalBehavior: 'Allow at least 3 to 4 hours to experience the central mandir, gardens, exhibitions, and musical fountain.'
        },
        nearbyFacilities: {
          accommodation: ['Crowne Plaza New Delhi Mayur Vihar', 'Holiday Inn New Delhi Mayur Vihar', 'The Leela Ambience Convention Hotel'],
          transportation: ['Akshardham Metro Station (Blue Line, 350 m walking distance)', 'Hazrat Nizamuddin Railway Station (6 km)', 'Indira Gandhi International Airport (22 km)'],
          food: ['Premvati Food Court inside complex (Pure vegetarian, satvik cuisine)', 'Haldiram\'s Mayur Vihar', 'Saravana Bhavan Connaught Place']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: true,
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/c/c2/New_Delhi_Temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Dakshineswar Kali Temple',
        slug: 'dakshineswar-kali-temple-kolkata',
        description: 'A celebrated 19th-century Navaratna (nine-spired) Hindu temple situated on the eastern bank of the Hooghly River in Kolkata, dedicated to Goddess Bhavatarini (an aspect of Kali). Revered globally as the spiritual sanctuary of the mystic saint Sri Ramakrishna Paramahamsa.',
        history: 'Founded in 1855 by the philanthropic queen Rani Rashmoni of Janbazar following a divine vision. The complex includes twelve identical Shiva shrines along the riverbank, a Vishnu temple, and the sacred Panchavati grove.',
        deity: 'Goddess Bhavatarini (Maa Kali) & Lord Shiva',
        location: {
          state: 'West Bengal',
          city: 'Kolkata',
          address: 'Mayadanga, Dakshineswar, Kolkata, West Bengal 700076',
          coordinates: { lat: 22.6554, lng: 88.3575 }
        },
        rituals: [
          { name: 'Mangala Aarti', time: '06:00 AM', description: 'Awakening lamps to Goddess Bhavatarini.' },
          { name: 'Bhog Aarti', time: '12:00 PM – 12:30 PM', description: 'Sacred mid-day offering of khichuri and payesh.' },
          { name: 'Sandhya Aarti', time: '07:00 PM – 07:30 PM', description: 'Evening devotional chanting with conch shells along the river.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:30 PM',
          evening: '03:30 PM – 08:30 PM',
          specialTimings: 'Open through the night on Kali Puja / Diwali'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest Indian attire recommended.',
          photographyRules: 'Photography allowed in the outer gardens and river ghats; forbidden inside the sanctum sanctorum.',
          footwearRules: 'Deposit shoes at the gate footwear counter.',
          generalBehavior: 'Visit Ramakrishna Paramahamsa’s preserved room (Kuthi Bari) with quiet reverence.'
        },
        nearbyFacilities: {
          accommodation: ['The Westin Kolkata Rajarhat', 'Holiday Inn Kolkata Airport', 'ITC Royal Bengal Kolkata'],
          transportation: ['Dakshineswar Metro Station (Blue Line, 200 m)', 'Dakshineswar Railway Station (500 m)', 'Netaji Subhash Chandra Bose International Airport (11 km)'],
          food: ['Dakshineswar Temple Mahaprasad Stall', 'Bhojohori Manna Pure Veg', 'Annapurna Sweets Dakshineswar']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/dakshineswar_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Ramappa Temple (Kakatiya Rudreshwara)',
        slug: 'ramappa-temple-rudreshwara-telangana',
        description: 'A 13th-century CE architectural marvel and UNESCO World Heritage Site in Palampet, Telangana. Commissioned by Kakatiya General Recharla Rudra, it is the only temple in India named after its brilliant chief sculptor and master craftsman, Ramappa.',
        history: 'Constructed over 40 years between 1213 and 1253 CE. Renowned for its porous light-weight "floating bricks" that float on water to minimize roof loads, and carved black basalt brackets depicting graceful bracket dancers (Madanikas).',
        deity: 'Lord Shiva (Ramalingeswara)',
        location: {
          state: 'Telangana',
          city: 'Palampet, Mulugu',
          address: 'Palampet Village, Venkatapur Mandal, Mulugu District, Telangana 506345',
          coordinates: { lat: 18.2612, lng: 79.9431 }
        },
        rituals: [
          { name: 'Pratah Pooja', time: '06:30 AM', description: 'Early morning abhishekam to the Shivalinga.' },
          { name: 'Sandhya Harathi', time: '06:00 PM', description: 'Evening lamp prayer illuminating the bracket sculptures.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:30 PM',
          evening: '01:30 PM – 06:00 PM',
          specialTimings: 'Maha Shivaratri three-day festival draws thousands of pilgrims from across the Deccan'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Decent, respectful tourist or traditional clothing.',
          photographyRules: 'Permitted in the monument grounds and sabha mandapa.',
          footwearRules: 'Shoes removed on the high star-shaped plinth platform.',
          generalBehavior: 'Observe the musical notes produced by tapping the polished basalt pillars; do not strike with metal objects.'
        },
        nearbyFacilities: {
          accommodation: ['Haritha Lake View Resort Ramappa (TSTDC)', 'Haritha Grand Hotel Warangal', 'Hotel Ashoka Hanamkonda'],
          transportation: ['Warangal Railway Station (65 km)', 'Kazipet Junction (70 km)', 'Rajiv Gandhi International Airport Hyderabad (210 km)'],
          food: ['Haritha Restaurant Ramappa', 'Maitri Pure Veg Warangal', 'Kakatiya Delights']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: false,
        images: [
          '/images/temples/ramappa_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Mahakaleshwar Jyotirlinga',
        slug: 'mahakaleshwar-jyotirlinga-ujjain-mp',
        description: 'One of the most sacred of the twelve Jyotirlingas, situated on the banks of the holy Shipra River in the ancient city of Ujjain. It is the only south-facing (Dakshinmukhi) Jyotirlinga, representing Lord Shiva as the Master of Death and Time (Mahakala).',
        history: 'Ujjain (ancient Avanti) is one of the seven holy Moksha puris of Hinduism and the prime meridian of ancient Indian astronomical calculation. The temple has five tiers, one underground where the Jyotirlinga resides. Rebuilt in the Maratha style in the 18th century by the Scindias.',
        deity: 'Lord Shiva (Mahakaleshwar)',
        location: {
          state: 'Madhya Pradesh',
          city: 'Ujjain',
          address: 'Jaisinghpura, Ujjain, Madhya Pradesh 456006',
          coordinates: { lat: 23.1827, lng: 75.7682 }
        },
        rituals: [
          { name: 'Bhasma Aarti', time: '04:00 AM – 06:00 AM', description: 'The legendary world-famous ritual where the Jyotirlinga is sanctified with fresh holy cow-dung ash.' },
          { name: 'Naivedya Aarti', time: '10:30 AM – 11:00 AM', description: 'Mid-morning royal offerings.' },
          { name: 'Sandhya Aarti', time: '05:00 PM – 05:45 PM', description: 'Evening twilight prayer with damrus.' },
          { name: 'Shayan Aarti', time: '10:30 PM – 11:00 PM', description: 'Night musical prayer before sanctum doors are sealed.' }
        ],
        darshanTimings: {
          morning: '04:00 AM – 01:00 PM',
          evening: '04:00 PM – 11:00 PM',
          specialTimings: 'Open 24 hours continuously during Maha Shivaratri and Shravan Somvars'
        },
        festivals: [shivaratriId, kumbhId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict traditional attire mandatory for Bhasma Aarti: Men must wear unstitched Dhoti and Angavastram (bare torso); Women must wear traditional Indian Saree.',
          photographyRules: 'Strictly prohibited inside the subterranean sanctum.',
          footwearRules: 'Deposit at footwear stalls outside the grand Mahakal Lok corridor.',
          generalBehavior: 'Advance online booking required for Bhasma Aarti via temple trust portal.'
        },
        nearbyFacilities: {
          accommodation: ['Mahakal Lok Yatri Niwas', 'Hotel Imperial Grand Ujjain', 'Anjushree Hotel Ujjain'],
          transportation: ['Ujjain Junction Railway Station (1.5 km)', 'Devi Ahilyabai Holkar Airport Indore (55 km)', 'Ujjain Bus Stand (2 km)'],
          food: ['Bhojanalaya Mahakal Trust', 'Apna Sweets Ujjain', 'Shree Ganga Pure Veg']
        },
        category: '12 Jyotirlingas',
        featured: true,
        popular: true,
        images: [
          '/images/temples/mahakaleshwar_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Dwarkadhish Temple (Jagat Mandir)',
        slug: 'dwarkadhish-temple-jagat-mandir-dwarka',
        description: 'Standing on the westernmost tip of the Saurashtra peninsula where the Gomti River meets the Arabian Sea, this 5-storied 72-pillared limestone shrine is dedicated to Lord Krishna as the King of Dwarka (Dwarkadhish).',
        history: 'Tradition attributes the original temple to Vajranabha, great-grandson of Lord Krishna. One of the cardinal Char Dham abodes and 108 Divya Desams. The present majestic structure in Chalukyan architectural style dates from the 16th century CE, topped by a 52-yard silk flag (Dhwaja) replaced five times daily.',
        deity: 'Lord Krishna (Dwarkadhish)',
        location: {
          state: 'Gujarat',
          city: 'Dwarka',
          address: 'Dwarka, Devbhumi Dwarka District, Gujarat 361335',
          coordinates: { lat: 22.2376, lng: 68.9678 }
        },
        rituals: [
          { name: 'Mangla Aarti', time: '06:30 AM', description: 'Early morning awakening prayer.' },
          { name: 'Dhwaja Aarohan', time: '5 times daily', description: 'Ceremonial climbing to replace the sacred 52-yard temple flag atop the 78-meter spire.' },
          { name: 'Sandhya Aarti', time: '07:30 PM', description: 'Grand evening devotional service.' },
          { name: 'Shayan Aarti', time: '09:30 PM', description: 'Night closing lullaby.' }
        ],
        darshanTimings: {
          morning: '06:30 AM – 01:00 PM',
          evening: '05:00 PM – 09:30 PM',
          specialTimings: 'Grand celebrations during Krishna Janmashtami attract over 500,000 pilgrims'
        },
        festivals: [janmashtamiId, diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest Indian attire. Western shorts and skirts are strictly disallowed.',
          photographyRules: 'Electronic gadgets, smartwatches, and phones must be safely deposited in cloakroom lockers.',
          footwearRules: 'Free shoe counters operated by Dwarkadhish Devasthanam outside Moksha Dwar.',
          generalBehavior: 'Enter through Moksha Dwar (Gate of Salvation) and exit through Swarga Dwar (Gate to Heaven) leading to Gomti Ghat.'
        },
        nearbyFacilities: {
          accommodation: ['Toran Tourist Bungalow Dwarka', 'The Fern Sattva Resort Dwarka', 'Dwarkadhish Yatri Bhavan'],
          transportation: ['Dwarka Railway Station (2 km)', 'Jamnagar Airport (130 km)', 'Porbandar Airport (100 km)'],
          food: ['Dwarka Trust Annakshetra', 'Shrinathji Pure Veg', 'Kant Dining Hall Gujarati Thali']
        },
        category: 'Char Dham',
        featured: true,
        popular: true,
        images: [
          '/images/temples/dwarkadhish_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Mata Vaishno Devi Temple',
        slug: 'mata-vaishno-devi-temple-katra-jk',
        description: 'One of the most revered and visited holy sanctuaries in India, located in a natural limestone cave on the sacred Trikuta mountain in Jammu & Kashmir. The holy cave enshrines the three natural stone rock forms (Pindies) representing Maha Kali, Maha Lakshmi, and Maha Saraswati.',
        history: 'Mentioned in the Mahabharata when Arjuna invoked Goddess Durga before the Kurukshetra war. The legendary 14-kilometer pilgrimage trek from the base town of Katra has been undertaken by millions for centuries, now managed by the Shri Mata Vaishno Devi Shrine Board (SMVDSB).',
        deity: 'Mata Vaishno Devi (Maha Shakti)',
        location: {
          state: 'Jammu & Kashmir',
          city: 'Katra, Reasi',
          address: 'Bhavan, Katra, Reasi District, Jammu and Kashmir 182301',
          coordinates: { lat: 33.0308, lng: 74.9490 }
        },
        rituals: [
          { name: 'Pratah Aarti', time: '05:30 AM – 07:00 AM', description: 'Early morning holy cave aarti broadcast live worldwide.' },
          { name: 'Havan & Abhishek', time: '10:00 AM', description: 'Vedic fire ceremony in the Yagya Shala.' },
          { name: 'Sandhya Aarti', time: '06:30 PM – 08:00 PM', description: 'Sunset devotional song and conch offering.' }
        ],
        darshanTimings: {
          morning: '05:00 AM – 12:00 PM',
          evening: '04:00 PM – 11:00 PM',
          specialTimings: 'Open 24 hours with brief pauses during morning and evening aartis'
        },
        festivals: [navaratriId, diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Comfortable trek clothing; warm jackets recommended even in summer evenings. Modest attire inside the holy cave.',
          photographyRules: 'Photography strictly prohibited inside the Bhavan sanctum.',
          footwearRules: 'Shoe lockers available at Bhavan entrance before sanctum stairs.',
          generalBehavior: 'Mandatory RFID Pilgrim Registration Card (Yatra Parchi) required before starting the 12 km trek from Katra.'
        },
        nearbyFacilities: {
          accommodation: ['SMVDSB Niharika Complex Katra', 'The White Hotels Katra', 'Fortune Inn Katra'],
          transportation: ['Shri Mata Vaishno Devi Katra Railway Station (SVDK, 1.5 km from Katra base)', 'Jammu Airport (50 km)', 'Battery cars and ropeway available between Sanjichhat and Bhavan'],
          food: ['SMVDSB Bhojanalayas (Clean satvik food without onion/garlic)', 'Prem Vaishno Dhaba Katra', 'Manoranjan Sweets']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/vaishno_devi_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Ranakpur Jain Temple (Chaturmukha Dharana Vihara)',
        slug: 'ranakpur-jain-temple-rajasthan',
        description: 'An architectural wonder in the Aravalli hills of Rajasthan, constructed entirely of light-colored marble. It features 1,444 uniquely carved marble pillars, where no two pillars share the same design, all designed so that none obstructs the view of the presiding Tirthankara.',
        history: 'Commissioned in the 15th century by Dharna Shah, a devout Porwal Jain minister, with patronage from the visionary Mewar ruler Rana Kumbha. The temple stands on a massive high-plinth terrace and took over 50 years to construct under chief architect Depa.',
        deity: 'Lord Rishabhanatha (Adinatha, First Tirthankara)',
        location: {
          state: 'Rajasthan',
          city: 'Ranakpur, Desuri, Pali',
          address: 'Ranakpur Road, Sadri, Pali District, Rajasthan 306702',
          coordinates: { lat: 25.1156, lng: 73.4731 }
        },
        rituals: [
          { name: 'Pratah Jinendra Pooja', time: '06:30 AM – 08:30 AM', description: 'Sacred water, saffron, and flower offering to the marble idol of Adinatha.' },
          { name: 'Aarti & Deep Mandir', time: '07:00 PM', description: 'Lighting of ghee lamps casting intricate stone shadows.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 11:30 AM (Pilgrims)',
          evening: '12:00 PM – 05:00 PM (Tourists & Visitors)',
          specialTimings: 'Non-Jain visitors permitted daily after 12:00 PM'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict dress code: Shoulders and knees must be fully covered. No short dresses or sleeveless tops. Leather items (belts, wallets, bags) are strictly prohibited.',
          photographyRules: 'Photography allowed with camera ticket; mobile phones on silent mode.',
          footwearRules: 'Footwear removed at outer entry staircase.',
          generalBehavior: 'Maintain silence in the pillar corridors to honor Jain principles of contemplation.'
        },
        nearbyFacilities: {
          accommodation: ['Fateh Bagh Ranakpur (Heritage Palace)', 'Mana Hotel Ranakpur', 'Ranakpur Dharamshala'],
          transportation: ['Falna Railway Station (35 km)', 'Maharana Pratap Airport Udaipur (95 km)', 'Jodhpur Airport (160 km)'],
          food: ['Ranakpur Temple Bhojanalaya (Pure Jain Satvik Bhojan)', 'Vari Restaurant', 'Padam Prabhu Pure Veg']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: false,
        images: [
          '/images/temples/ranakpur_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Hoysaleswara Temple (Halebidu)',
        slug: 'hoysaleswara-temple-halebidu-karnataka',
        description: 'A 12th-century masterpiece of Hoysala architecture and a designated UNESCO World Heritage Site in Halebidu, Karnataka. This twin-sanctuary temple carved from soapstone is famous for its intricate horizontal friezes depicting thousands of elephants, lions, horses, and celestial dancers, no two of which are identical.',
        history: 'Commissioned in 1121 CE by King Vishnuvardhana of the Hoysala Empire and master craftsmen Kedaroja and Kedaraja. It survived the 14th-century invasions of the Delhi Sultanate to remain one of the most artistic rock-sculpted temple complexes on earth.',
        deity: 'Lord Shiva (Hoysaleswara & Shantaleswara)',
        location: {
          state: 'Karnataka',
          city: 'Halebidu, Hassan',
          address: 'Halebeedu, Hassan District, Karnataka 573121',
          coordinates: { lat: 13.2163, lng: 75.9936 }
        },
        rituals: [
          { name: 'Heritage Sunrise Walk', time: '06:30 AM', description: 'Morning light illuminating the soapstone friezes.' }
        ],
        darshanTimings: {
          morning: '06:30 AM – 12:30 PM',
          evening: '01:30 PM – 06:30 PM',
          specialTimings: 'Maha Shivaratri pooja conducted by local priests'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Decent, respectful tourist attire.',
          photographyRules: 'Permitted in courtyard and open mandapas; ASI guidelines apply.',
          footwearRules: 'Shoes removed at the flight of entrance steps.',
          generalBehavior: 'Examine the monolithic Nandi statues and Garuda pillar in the courtyard.'
        },
        nearbyFacilities: {
          accommodation: ['KSTDC Hotel Mayura Shantala Halebeedu', 'The Gateway Hotel Hassan', 'Hoysala Village Resort Hassan'],
          transportation: ['Hassan Junction Railway Station (30 km)', 'Mangalore International Airport (165 km)', 'Kempegowda Airport Bengaluru (215 km)'],
          food: ['Hoysala Restaurant', 'Hotel Sri Krishna Pure Veg Halebidu', 'Mayura Restaurant']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: false,
        images: [
          '/images/temples/hoysaleswara_temple.png'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Kailasa Temple (Ellora Caves Cave 16)',
        slug: 'kailasa-temple-ellora-caves-maharashtra',
        description: 'The largest monolithic rock-cut monument in the world, carved vertically downward from a single cliff of basalt rock at the UNESCO World Heritage Site of Ellora in Maharashtra. An unbelievable engineering wonder designed to model Mount Kailash, the cosmic abode of Lord Shiva.',
        history: 'Excavated in the 8th century CE under King Krishna I of the Rashtrakuta dynasty. Craftsmen carved over 200,000 tonnes of rock from top to bottom over two decades, crafting multi-level shrines, life-sized carved elephants, and double-storied gateways without modern tools.',
        deity: 'Lord Shiva (Kailasanatha)',
        location: {
          state: 'Maharashtra',
          city: 'Ellora, Chhatrapati Sambhaji Nagar',
          address: 'Ellora Caves, Chhatrapati Sambhaji Nagar District, Maharashtra 431102',
          coordinates: { lat: 20.0238, lng: 75.1793 }
        },
        rituals: [
          { name: 'Heritage Sunrise Walk', time: '06:00 AM', description: 'Early morning light on the 32-meter high carved monolithic Vimana.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:00 PM',
          evening: '12:00 PM – 06:00 PM',
          specialTimings: 'Closed on Tuesdays. Special illumination during Ellora-Ajanta Dance Festival'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Comfortable walking shoes and modest clothes. Carry water for cave complex exploration.',
          photographyRules: 'Photography allowed throughout the rock-cut courtyard. Flash prohibited inside dark chambers to protect ancient plaster.',
          footwearRules: 'Shoes must be removed at the sanctum lingam threshold.',
          generalBehavior: 'Do not scratch or touch the ancient monolithic relief sculptures.'
        },
        nearbyFacilities: {
          accommodation: ['MTDC Resort Ellora', 'Vivanta Chhatrapati Sambhaji Nagar', 'Hotel Kailas Ellora'],
          transportation: ['Chhatrapati Sambhaji Nagar Airport (35 km)', 'Chhatrapati Sambhaji Nagar Railway Station (28 km)', 'Frequent MSRTC tourist buses'],
          food: ['Kailas Restaurant Pure Veg', 'MTDC Restaurant Ellora', 'Bhoj Restaurant Sambhaji Nagar']
        },
        category: 'UNESCO World Heritage',
        featured: true,
        popular: true,
        images: [
          '/images/temples/kailasa_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Lingaraj Temple',
        slug: 'lingaraj-temple-bhubaneswar-odisha',
        description: 'The largest and most prominent temple in Bhubaneswar, the "Temple City of India". Representing the pinnacle of Kalinga architecture, its majestic 55-meter deula spire is dedicated to Harihara, a combined form of Lord Vishnu (Hari) and Lord Shiva (Hara).',
        history: 'Constructed by kings of the Somavamsi and Eastern Ganga dynasties between the 11th and 12th centuries CE. Surrounded by a monumental laterite enclosure containing over 150 subsidiary shrines and the sacred Bindusagar holy tank.',
        deity: 'Lord Shiva & Lord Vishnu (Harihara / Lingaraj)',
        location: {
          state: 'Odisha',
          city: 'Bhubaneswar',
          address: 'Lingaraj Nagar, Old Town, Bhubaneswar, Odisha 751002',
          coordinates: { lat: 20.2382, lng: 85.8338 }
        },
        rituals: [
          { name: 'Alati Pooja', time: '06:00 AM', description: 'Awakening ritual of Lord Harihara.' },
          { name: 'Mahasnana', time: '08:30 AM', description: 'Holy bath with water brought from Bindusagar lake.' },
          { name: 'Bada Singhar Besha', time: '10:30 PM', description: 'Night floral decoration before resting.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:30 PM',
          evening: '03:30 PM – 09:30 PM',
          specialTimings: 'Rukuna Ratha Yatra in April/May sees Lord Lingaraj taken out in a monumental chariot'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict traditional attire. Jeans and Western garments are barred.',
          photographyRules: 'Strictly prohibited. All electronics and cameras must be deposited outside.',
          footwearRules: 'Footwear not permitted within the compound walls.',
          generalBehavior: 'Non-Hindus can view the complete temple complex from the elevated British Curzon Viewing Platform outside the northern wall.'
        },
        nearbyFacilities: {
          accommodation: ['Mayfair Lagoon Bhubaneswar', 'Fortune Park Sishmo', 'OTDC Panthanivas Bhubaneswar'],
          transportation: ['Bhubaneswar Railway Station (5 km)', 'Biju Patnaik International Airport (3.5 km)', 'City bus route along Old Town'],
          food: ['Lingaraj Temple Mahaprasad (Abadha)', 'Trupti Veg Restaurant', 'Odiyan Pure Veg']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/lingaraj_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Sabarimala Sree Dharma Sastha Temple',
        slug: 'sabarimala-sree-dharma-sastha-temple-kerala',
        description: 'An ancient hill shrine nestled amidst 18 forested hills in the Periyar Tiger Reserve of the Western Ghats in Kerala, dedicated to Lord Ayyappa. Devotees ascend the holy 18 golden steps (Pathinettampadi) carrying the sacred Irumudi kettu after observing 41 days of austere vratham.',
        history: 'Tradition connects the shrine to Sage Parashurama. Lord Ayyappa, born of the divine union of Shiva and Vishnu (Mohini), chose this mountain retreat for deep meditation after defeating the demoness Mahishi.',
        deity: 'Lord Ayyappa (Dharma Sastha)',
        location: {
          state: 'Kerala',
          city: 'Pathanamthitta',
          address: 'Sabarimala, Ranni, Pathanamthitta District, Kerala 689662',
          coordinates: { lat: 9.4404, lng: 77.0819 }
        },
        rituals: [
          { name: 'Nirmalya Darshanam', time: '03:00 AM', description: 'Opening of sanctum doors with divine conch blowing.' },
          { name: 'Neyyabhishekam', time: '03:30 AM – 11:30 AM', description: 'The premier sacred ritual where pure ghee carried in coconut by pilgrims is poured on the idol.' },
          { name: 'Harivarasanam', time: '11:00 PM', description: 'The celestial lullaby chanted every night as the temple priests extinguish lamps.' }
        ],
        darshanTimings: {
          morning: '03:00 AM – 01:00 PM',
          evening: '03:00 PM – 11:00 PM',
          specialTimings: 'Open during Mandala-Makaravilakku season (mid-November to mid-January) and the first 5 days of each Malayalam month'
        },
        festivals: [makaravilakkuId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict pilgrim attire: Black, dark blue, or saffron Mundu/dhoti with sacred Rudraksha beads.',
          photographyRules: 'Mobile phones and recording cameras are completely prohibited around the Sannidhanam.',
          footwearRules: 'Pilgrims walk barefoot throughout the 5 km mountain trail from Pamba base.',
          generalBehavior: 'Mandatory online virtual queue booking and verification via the Kerala Police Sabarimala portal.'
        },
        nearbyFacilities: {
          accommodation: ['Travancore Devaswom Board Pilgrim Dormitories at Sannidhanam & Pamba', 'KTDC Tamarind Peermedu', 'Hotel Ambadi Periyar'],
          transportation: ['Chengannur Railway Station (90 km to Pamba base)', 'Kottayam Railway Station (120 km)', 'Cochin International Airport (155 km)'],
          food: ['Devaswom Annadana Mandapam (Free vegetarian meals for all pilgrims)', 'Pamba base food stalls', 'Appam & Aravana Prasadam counter']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/sabarimala_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Sri Ranganathaswamy Temple (Srirangam)',
        slug: 'sri-ranganathaswamy-temple-srirangam-tamil-nadu',
        description: 'The largest functioning Hindu temple complex in the world, spanning 156 acres enclosed by seven concentric rectangular enclosures (prakaras) with 21 magnificent sculpted Gopurams on an island in the Kaveri River. Revered as the foremost of the 108 sacred Divya Desams.',
        history: 'Mentioned in ancient Sangam literature and extensively patronized by the Chola, Pandya, Hoysala, and Vijayanagara monarchs. The monumental southern Rajagopuram, completed in 1987, rises 73 meters (239 feet) into the sky, making it one of the tallest religious towers in Asia.',
        deity: 'Lord Vishnu (Ranganatha in reclining posture)',
        location: {
          state: 'Tamil Nadu',
          city: 'Tiruchirappalli',
          address: 'Srirangam, Tiruchirappalli, Tamil Nadu 620006',
          coordinates: { lat: 10.8624, lng: 78.6901 }
        },
        rituals: [
          { name: 'Viswaroopa Seva', time: '06:00 AM – 07:15 AM', description: 'Waking the reclining Lord Ranganatha with Vedic hymns and sacred elephant procession.' },
          { name: 'Uchikala Pooja', time: '12:00 PM', description: 'Midday worship and royal Naivedyam.' },
          { name: 'Veena Ekantha Seva', time: '09:00 PM', description: 'Night divine veena melody played exclusively for the Lord before retirement.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:00 PM',
          evening: '03:30 PM – 09:00 PM',
          specialTimings: '21-day Vaikunta Ekadashi festival attracts hundreds of thousands for Paramapada Vasal opening'
        },
        festivals: [vaikuntaId, diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict traditional dress code. Men: Dhoti/Veshti. Women: Saree or Salwar with Dupatta.',
          photographyRules: 'Permitted in outer prakaras; strictly prohibited in the inner Sanctum Sanctorum.',
          footwearRules: 'Free shoe counters at the southern Rajagopuram gate.',
          generalBehavior: 'Explore the 1,000-pillar hall and climb to the temple rooftop for a view of the golden Vimana.'
        },
        nearbyFacilities: {
          accommodation: ['TTDC Hotel Tamil Nadu Trichy', 'SRM Hotel Trichy', 'Srirangam Yatri Nivas'],
          transportation: ['Srirangam Railway Station (1 km)', 'Tiruchirappalli Junction (9 km)', 'Tiruchirappalli International Airport (15 km)'],
          food: ['Mani Cafe Srirangam (Famous butter dosa & filter coffee)', 'Sangeetha Pure Veg', 'Sri Ranga Vilas Mess']
        },
        category: 'Divya Desam',
        featured: true,
        popular: true,
        images: [
          '/images/temples/srirangam_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Trimbakeshwar Shiva Temple',
        slug: 'trimbakeshwar-shiva-temple-nashik-maharashtra',
        description: 'An ancient Jyotirlinga shrine located at the foothills of the Brahmagiri mountain in Nashik, Maharashtra, originating the holy Godavari River. Uniquely, the Jyotirlinga has three faces personifying Lord Brahma, Lord Vishnu, and Lord Shiva (Rudra).',
        history: 'Commissioned in black basalt stone by the third Maratha Peshwa Balaji Baji Rao (Nana Saheb) between 1755 and 1786 CE on the site of an earlier shrine. A prominent host site for the sacred Kumbh Mela (Simhastha Kumbh).',
        deity: 'Lord Shiva (Trimbakeshwar / Trayambakeshwar)',
        location: {
          state: 'Maharashtra',
          city: 'Trimbak, Nashik',
          address: 'Trimbakeshwar, Nashik District, Maharashtra 422212',
          coordinates: { lat: 19.9328, lng: 73.5306 }
        },
        rituals: [
          { name: 'Morning Abhishek', time: '06:00 AM – 07:00 AM', description: 'Early morning sacred milk and Panchamrit bath of the three-faced linga.' },
          { name: 'Madhyan Pooja', time: '01:00 PM – 01:30 PM', description: 'Noon jewel-studded golden mask (Mukuta) darshan.' },
          { name: 'Sandhya Aarti', time: '07:00 PM – 08:00 PM', description: 'Evening devotional chanting with conch and gongs.' }
        ],
        darshanTimings: {
          morning: '05:30 AM – 01:00 PM',
          evening: '02:00 PM – 09:00 PM',
          specialTimings: 'Continuous opening on Mondays and Maha Shivaratri'
        },
        festivals: [shivaratriId, kumbhId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Men must wear unstitched cotton or silk Dhoti (Sovale) for direct touch Abhishek; women must wear Saree. Western clothing barred in inner sanctum.',
          photographyRules: 'Strictly prohibited in the sanctum.',
          footwearRules: 'Shoe counters outside the stone perimeter.',
          generalBehavior: 'Bathe in the holy Kushavarta Teerth before offering prayers at the main sanctum.'
        },
        nearbyFacilities: {
          accommodation: ['MTDC Holiday Resort Trimbakeshwar', 'Hotel Krushna Inn Trimbak', 'The Gateway Hotel Ambad Nashik'],
          transportation: ['Nashik Road Railway Station (38 km)', 'Ozar Airport Nashik (50 km)', 'Frequent MSRTC buses from Nashik CBS'],
          food: ['Trimbakeshwar Trust Prasad Bhojanalaya', 'Hotel Radhika Pure Veg', 'Shree Sadguru Pure Veg']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: true,
        images: [
          '/images/temples/trimbakeshwar_temple.png'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Omkareshwar Jyotirlinga',
        slug: 'omkareshwar-jyotirlinga-madhya-pradesh',
        description: 'One of the twelve sacred Jyotirlingas, situated on the Mandhata (Shivapuri) island in the Narmada River, which is naturally shaped like the sacred Hindu symbol Om (ॐ). Devotees undertake the sacred 7 km island parikrama.',
        history: 'Mentioned in the Skanda and Shiva Puranas where King Mandhata performed intense penance. Rebuilt in the Nagara architectural style with carved stone pillars depicting mythological scenes during the reign of the Paramara dynasty and Holkars of Indore.',
        deity: 'Lord Shiva (Omkareshwar & Mamleshwar)',
        location: {
          state: 'Madhya Pradesh',
          city: 'Mandhata, Khandwa',
          address: 'Omkareshwar, Khandwa District, Madhya Pradesh 450523',
          coordinates: { lat: 22.2464, lng: 76.1506 }
        },
        rituals: [
          { name: 'Mangala Aarti', time: '05:00 AM', description: 'Waking lamps on the sacred Narmada island.' },
          { name: 'Madhyana Bhog', time: '12:00 PM', description: 'Sacred midday offering.' },
          { name: 'Shayan Aarti', time: '09:00 PM', description: 'Night divine dice game (Chaupar) played between Shiva and Parvati.' }
        ],
        darshanTimings: {
          morning: '05:00 AM – 12:30 PM',
          evening: '04:00 PM – 09:30 PM',
          specialTimings: 'Continuous opening on Mondays of Shravan'
        },
        festivals: [shivaratriId, shravanId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest Indian attire recommended.',
          photographyRules: 'Prohibited inside the subterranean sanctum.',
          footwearRules: 'Shoe counters outside island suspension bridges (Jhula Pul).',
          generalBehavior: 'Boat rides and parikrama on the Narmada require life jackets.'
        },
        nearbyFacilities: {
          accommodation: ['MPSTDC Narmada Resort Omkareshwar', 'Hotel Om Shiva', 'Dharamshala Complex'],
          transportation: ['Omkareshwar Road Railway Station (12 km)', 'Indore Airport (80 km)', 'Khandwa Junction (70 km)'],
          food: ['Omkareshwar Trust Annakshetra', 'Narmada Bhojanalaya', 'Shree Krishna Pure Veg']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: true,
        images: [
          '/images/temples/omkareshwar_temple.png'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Baba Baidyanath Jyotirlinga',
        slug: 'baba-baidyanath-temple-deoghar-jharkhand',
        description: 'A celebrated Jyotirlinga and Shakti Peetha located in Deoghar, Jharkhand. Lord Shiva is worshipped here as Baidyanath (the Supreme Divine Healer). Hosts the epic annual Shravani Mela where millions of Kanwariyas walk 108 km carrying holy Ganga water.',
        history: 'According to legend, Ravana worshipped Lord Shiva here and offered his ten heads to please him. Lord Shiva, pleased with his devotion, cured his wounds like a physician (Vaidya), hence the name Baidyanath.',
        deity: 'Lord Shiva (Baidyanath / Kamada Linga)',
        location: {
          state: 'Jharkhand',
          city: 'Deoghar',
          address: 'Shivganga Muhalla, Deoghar, Jharkhand 814112',
          coordinates: { lat: 24.4925, lng: 86.7001 }
        },
        rituals: [
          { name: 'Kacha Jal Pooja', time: '04:00 AM – 05:30 AM', description: 'Early morning holy water pouring ritual.' },
          { name: 'Shringar Aarti', time: '07:30 PM – 08:30 PM', description: 'Adorning the Jyotirlinga with flowers, sandal, and bilva leaves.' }
        ],
        darshanTimings: {
          morning: '04:00 AM – 03:30 PM',
          evening: '06:00 PM – 09:30 PM',
          specialTimings: 'Special queue tokens issued during Shravani Mela in July/August'
        },
        festivals: [shivaratriId, shravanId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Traditional attire for Jalabhishekam. Saffron robes worn by Kanwariya pilgrims.',
          photographyRules: 'Strictly prohibited in the sanctum.',
          footwearRules: 'Footwear deposited before the Lion Gate.',
          generalBehavior: 'Bathe in the sacred Shivaganga holy pool before darshan.'
        },
        nearbyFacilities: {
          accommodation: ['Hotel Baidyanath Deoghar', 'Hotel Yashoda International', 'Bihar State Tourism Hotel Natraj'],
          transportation: ['Deoghar Airport (8 km)', 'Jasidih Junction Railway Station (7 km)', 'Deoghar Bus Stand (2 km)'],
          food: ['Baidyanath Trust Bhojanalaya', 'Amrapali Pure Veg', 'Famous Deoghar Peda stalls outside gate']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: true,
        images: [
          '/images/temples/baidyanath_temple.png'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Mallikarjuna Jyotirlinga (Srisailam)',
        slug: 'mallikarjuna-jyotirlinga-srisailam-andhra-pradesh',
        description: 'Perched on the flat top of the Nallamala Hills overlooking the Krishna River, this ancient complex is unique in India for being both one of the twelve sacred Jyotirlingas and one of the 18 Maha Shakti Peethas (Bhramaramba Devi).',
        history: 'Referenced in the Mahabharata, Puranas, and praised by Adi Shankaracharya who composed Sivananda Lahari here. Endowed by the Kakatiyas, Vijayanagara Emperor Sri Krishna Devaraya, and Chhatrapati Shivaji Maharaj.',
        deity: 'Lord Shiva (Mallikarjuna) & Goddess Bhramaramba Devi',
        location: {
          state: 'Andhra Pradesh',
          city: 'Srisailam, Nandyal',
          address: 'Srisailam, Nandyal District, Andhra Pradesh 518101',
          coordinates: { lat: 16.0744, lng: 78.8682 }
        },
        rituals: [
          { name: 'Suprabhata Seva', time: '04:30 AM', description: 'Early morning waking chant.' },
          { name: 'Sparsha Darshanam', time: '06:00 AM – 03:00 PM', description: 'Devotees are permitted to physically touch the holy Jyotirlinga with forehead.' },
          { name: 'Ekantha Seva', time: '10:00 PM', description: 'Night closing worship.' }
        ],
        darshanTimings: {
          morning: '04:30 AM – 03:30 PM',
          evening: '06:00 PM – 10:00 PM',
          specialTimings: 'Continuous darshan on Maha Shivaratri'
        },
        festivals: [shivaratriId, navaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict traditional Indian clothing: Men: Dhoti/Kurta; Women: Saree/Salwar with dupatta.',
          photographyRules: 'Strictly prohibited inside inner sanctums.',
          footwearRules: 'Shoe counters outside the massive four fortification gopurams.',
          generalBehavior: 'Observe serenity in the sacred Patala Ganga riverside area.'
        },
        nearbyFacilities: {
          accommodation: ['APTDC Haritha Srisailam', 'Devasthanam Ganga Sadan & Gauri Sadan', 'Grand Akka Mahadevi Hotel'],
          transportation: ['Markapur Road Railway Station (85 km)', 'Rajiv Gandhi International Airport Hyderabad (200 km)', 'Ghat road bus service'],
          food: ['Devasthanam Nitya Annadana Bhavanam', 'Trishul Pure Veg', 'Sri Rama Hotel']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: true,
        images: [
          '/images/temples/mallikarjuna_temple.png'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Bhimashankar Jyotirlinga',
        slug: 'bhimashankar-jyotirlinga-pune-maharashtra',
        description: 'Situated in the Sahyadri mountains near Pune at the origin of the sacred Bhima River, Bhimashankar is a revered Jyotirlinga surrounded by lush evergreen forests of the Bhimashankar Wildlife Sanctuary.',
        history: 'Built in the Nagara architectural style with intricate stone carvings. The sabha mandap was constructed in the 18th century by Nana Phadnavis, the visionary statesman of the Maratha Empire. A historic Roman-style chime bell presented by Chimaji Appa hangs in the courtyard.',
        deity: 'Lord Shiva (Bhimashankar)',
        location: {
          state: 'Maharashtra',
          city: 'Bhorgiri, Khed, Pune',
          address: 'Bhimashankar, Pune District, Maharashtra 410509',
          coordinates: { lat: 19.0722, lng: 73.5358 }
        },
        rituals: [
          { name: 'Kakad Aarti', time: '04:30 AM – 05:00 AM', description: 'Early morning conch blowing and waking aarti.' },
          { name: 'Panchamrit Abhishek', time: '05:30 AM – 02:00 PM', description: 'Sacred milk, honey, and curd bath.' },
          { name: 'Sandhya Aarti', time: '07:30 PM', description: 'Evening prayer.' }
        ],
        darshanTimings: {
          morning: '04:30 AM – 12:00 PM',
          evening: '04:00 PM – 09:30 PM',
          specialTimings: 'Maha Shivaratri fair draws thousands from Maharashtra and Gujarat'
        },
        festivals: [shivaratriId, shravanId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest Indian attire recommended. Warm jacket needed in monsoon and winter.',
          photographyRules: 'Prohibited inside the inner garbhagriha.',
          footwearRules: 'Footwear left outside the stone steps entrance.',
          generalBehavior: 'Watch for wildlife in the surrounding sanctuary; avoid plastic littering.'
        },
        nearbyFacilities: {
          accommodation: ['MTDC Resort Bhimashankar', 'Blue Mormon Jungle Holiday Resort', 'Local Dharamshalas'],
          transportation: ['Pune Railway Station (110 km)', 'Pune International Airport (105 km)', 'MSRTC direct bus from Shivajinagar Pune'],
          food: ['Bhimashankar Sansthan Bhojanalaya', 'Hotel Shivneri Pure Veg', 'Local Maharashtrian Pithla Bhakri stalls']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: false,
        images: [
          '/images/temples/bhimashankar_temple.png'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Grishneshwar Jyotirlinga',
        slug: 'grishneshwar-jyotirlinga-verul-maharashtra',
        description: 'The twelfth and final Jyotirlinga of Lord Shiva, situated in the historic village of Verul less than a kilometer from the world-famous Ellora Caves. The temple is built of vibrant red sandstone and crowned with a five-tier carved shikhara.',
        history: 'Mentioned in the Shiva Purana as the place where the devout Kusuma worshipped Lord Shiva. Rebuilt in the 16th century by Maloji Bhosale (grandfather of Chhatrapati Shivaji) and later restored to its present pristine glory in the 18th century by Maharani Ahilyabai Holkar of Indore.',
        deity: 'Lord Shiva (Grishneshwar / Dhushmeshwar)',
        location: {
          state: 'Maharashtra',
          city: 'Verul, Chhatrapati Sambhaji Nagar',
          address: 'Grishneshwar Temple Road, Verul, Maharashtra 431102',
          coordinates: { lat: 20.0244, lng: 75.1706 }
        },
        rituals: [
          { name: 'Mangala Aarti', time: '05:30 AM', description: 'Early morning awakening prayer.' },
          { name: 'Jalabhishekam', time: '06:00 AM – 11:30 AM', description: 'Touch-abhishek with water and bilva leaves.' },
          { name: 'Sayana Aarti', time: '09:00 PM', description: 'Night closing prayer.' }
        ],
        darshanTimings: {
          morning: '05:30 AM – 12:30 PM',
          evening: '04:00 PM – 09:30 PM',
          specialTimings: 'Open through the night on Maha Shivaratri'
        },
        festivals: [shivaratriId, shravanId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Men must remove shirts, vests, and belts (bare chest) to enter the inner sanctum garbhagriha. Women must wear traditional Indian attire.',
          photographyRules: 'Strictly prohibited in the sanctum.',
          footwearRules: 'Shoe counters available outside main gate.',
          generalBehavior: 'Easily combined with an Ellora Caves excursion on the same day.'
        },
        nearbyFacilities: {
          accommodation: ['Hotel Kailas Ellora', 'MTDC Resort Ellora', 'Vivanta Chhatrapati Sambhaji Nagar'],
          transportation: ['Chhatrapati Sambhaji Nagar Railway Station (29 km)', 'Chhatrapati Sambhaji Nagar Airport (36 km)', 'Direct tourist taxis from city'],
          food: ['Bhoj Thali Ellora', 'Kailas Pure Veg', 'Hotel Shivam Bhojanalaya']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: false,
        images: [
          '/images/temples/grishneshwar_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Nageshwar Jyotirlinga',
        slug: 'nageshwar-jyotirlinga-dwarka-gujarat',
        description: 'Situated on the Saurashtra coast between Dwarka and Beyt Dwarka, this revered Jyotirlinga is dedicated to Lord Shiva as the Lord of Serpents (Nagesh). A colossal 25-meter (82-foot) statue of Lord Shiva in seated meditative posture graces the temple garden.',
        history: 'Described in the Rudra Samhita of Shiva Purana as Darukavana. The sanctum houses a south-facing tri-mukhi lingam with a silver lining and a copper cobra hood.',
        deity: 'Lord Shiva (Nageshwar)',
        location: {
          state: 'Gujarat',
          city: 'Daarukavanam, Dwarka',
          address: 'Nageshwar, Devbhumi Dwarka District, Gujarat 361345',
          coordinates: { lat: 22.3347, lng: 69.0544 }
        },
        rituals: [
          { name: 'Pratah Aarti', time: '06:00 AM', description: 'Morning bell clanging and aarti.' },
          { name: 'Rudrabhishek', time: '07:00 AM – 12:00 PM', description: 'Chanting of Sri Rudram over the holy lingam.' },
          { name: 'Sandhya Aarti', time: '07:00 PM', description: 'Evening sunset aarti.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:30 PM',
          evening: '04:00 PM – 09:30 PM',
          specialTimings: 'Maha Shivaratri festival fair with thousands of pilgrims'
        },
        festivals: [shivaratriId, diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Men must wear Dhoti for abhishekam inside sanctum. Modest clothes for parikrama.',
          photographyRules: 'Permitted in outer garden around giant statue; prohibited in inner sanctum.',
          footwearRules: 'Deposit at entrance stalls.',
          generalBehavior: 'Respect the meditative atmosphere around the Shiva statue.'
        },
        nearbyFacilities: {
          accommodation: ['Hotels and Dharamshalas in Dwarka city (16 km)', 'Toran Tourist Bungalow Dwarka'],
          transportation: ['Dwarka Railway Station (16 km)', 'Jamnagar Airport (140 km)', 'Frequent shared autos and taxis from Dwarka'],
          food: ['Nageshwar Temple Trust Canteen', 'Dwarka Pure Veg Restaurants']
        },
        category: '12 Jyotirlingas',
        featured: false,
        popular: false,
        images: [
          '/images/temples/nageshwar_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Gangotri Temple',
        slug: 'gangotri-temple-uttarkashi-uttarakhand',
        description: 'Perched at 3,100 meters in the high Himalayas on the banks of the Bhagirathi River, this pristine white granite shrine is the sacred seat of Goddess Ganga and the starting point of the Chota Char Dham Yatra in Uttarakhand.',
        history: 'Built in the early 18th century by the Gorkha General Amar Singh Thapa. Nearby lies the Bhagirath Shila where King Bhagiratha meditated to bring the sacred river Ganga down to Earth from heaven to liberate his ancestors.',
        deity: 'Goddess Ganga',
        location: {
          state: 'Uttarakhand',
          city: 'Gangotri, Uttarkashi',
          address: 'Gangotri, Uttarkashi District, Uttarakhand 249137',
          coordinates: { lat: 30.9947, lng: 78.9398 }
        },
        rituals: [
          { name: 'Morning Aarti', time: '06:00 AM', description: 'Early morning offering with holy water from the roaring Bhagirathi river.' },
          { name: 'Sandhya Aarti', time: '07:00 PM', description: 'Evening Ganga Aarti with burning camphor and bronze bells.' }
        ],
        darshanTimings: {
          morning: '06:15 AM – 02:00 PM',
          evening: '03:00 PM – 09:30 PM',
          specialTimings: 'Open from Akshaya Tritiya (May) to Diwali (October/November)'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Heavy woolen garments required due to high altitude mountain weather.',
          photographyRules: 'Prohibited inside the inner sanctum.',
          footwearRules: 'Leave shoes outside the temple courtyard boundary.',
          generalBehavior: 'Biometric registration required for Char Dham Yatra at Rishikesh or Uttarkashi.'
        },
        nearbyFacilities: {
          accommodation: ['GMVN Tourist Bungalow Gangotri', 'Bhagirathi Sadan Dharamshala', 'Local Himalayan lodges'],
          transportation: ['Motorable NH-34 road right up to Gangotri temple gate', 'Rishikesh Railway Station (260 km)', 'Jolly Grant Airport Dehradun (280 km)'],
          food: ['GMVN Canteen', 'Local pilgrim bhojanalayas serving hot lentils, roti, and tea']
        },
        category: 'Char Dham',
        featured: false,
        popular: true,
        images: [
          '/images/temples/gangotri_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Yamunotri Temple',
        slug: 'yamunotri-temple-uttarkashi-uttarakhand',
        description: 'The sacred source of the Yamuna River, nestled at 3,293 meters in the Garhwal Himalayas near the Indo-China border. Pilgrims traditionally commence their sacred Char Dham pilgrimage by first paying homage at Yamunotri.',
        history: 'Originally constructed by Maharaja Pratap Shah of Tehri Garhwal in the 19th century. Renowned for its natural boiling-hot sulfur water springs (Surya Kund) where pilgrims cook rice in cloth pouches as sacred prasadam.',
        deity: 'Goddess Yamuna',
        location: {
          state: 'Uttarakhand',
          city: 'Yamunotri, Uttarkashi',
          address: 'Yamunotri, Uttarkashi District, Uttarakhand 249141',
          coordinates: { lat: 31.0140, lng: 78.4600 }
        },
        rituals: [
          { name: 'Pratah Aarti', time: '06:30 AM', description: 'Early morning worship and offering.' },
          { name: 'Surya Kund Prasad Cooking', time: 'Continuous', description: 'Cooking rice in natural hot spring waters.' },
          { name: 'Sandhya Aarti', time: '07:30 PM', description: 'Evening mountain aarti.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:00 PM',
          evening: '04:00 PM – 08:30 PM',
          specialTimings: 'Open from Akshaya Tritiya to Bhai Dooj'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Heavy thermal and woolen clothing essential.',
          photographyRules: 'Prohibited inside sanctum.',
          footwearRules: 'Removed at the entrance courtyard steps.',
          generalBehavior: '6 km mountain trek from Janki Chatti base (ponies and palanquins available).'
        },
        nearbyFacilities: {
          accommodation: ['GMVN Tourist Bungalow Janki Chatti', 'Yamunotri Dharamshala', 'Private guest houses at Barkot'],
          transportation: ['6 km trek from Janki Chatti', 'Dehradun Railway Station (180 km)', 'Rishikesh (215 km)'],
          food: ['Local mountain stalls serving hot parathas, maggi, and satvik dal-chawal']
        },
        category: 'Char Dham',
        featured: false,
        popular: true,
        images: [
          '/images/temples/yamunotri_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Kanchi Kamakshi Amman Temple',
        slug: 'kanchi-kamakshi-amman-temple-kanchipuram',
        description: 'One of the most important and venerated Shakti Peethas in India, situated in the ancient temple city of Kanchipuram. Unlike other temples where Parvati is worshipped alongside Shiva, Kamakshi is the sole presiding goddess of Kanchipuram, seated in the majestic Padmasana posture.',
        history: 'Associated deeply with Adi Shankaracharya, who established the sacred Sri Chakra (Sri Yantra) in front of the deity to pacify the fierce form of the goddess into a benevolent, loving mother (Kamakshi).',
        deity: 'Goddess Kamakshi (Supreme Lalitha Tripurasundari)',
        location: {
          state: 'Tamil Nadu',
          city: 'Kanchipuram',
          address: 'Kamakshi Amman Sannadhi St, Kanchipuram, Tamil Nadu 631502',
          coordinates: { lat: 12.8407, lng: 79.7032 }
        },
        rituals: [
          { name: 'Ushakkala Pooja', time: '05:30 AM', description: 'Early morning conch blowing and waking aarti.' },
          { name: 'Sri Chakra Pooja', time: '08:00 AM & 06:00 PM', description: 'Sacred kumkum archana over the divine Sri Yantra established by Adi Shankara.' },
          { name: 'Thanga Ratham (Golden Chariot)', time: '07:30 PM (Fridays & Festivals)', description: 'Grand procession of the goddess in a solid gold chariot around the temple courtyard.' }
        ],
        darshanTimings: {
          morning: '05:30 AM – 12:30 PM',
          evening: '04:00 PM – 09:00 PM',
          specialTimings: 'Fridays and Pournami witness extended special darshan timings'
        },
        festivals: [navaratriId, diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict traditional dress code. Men: Dhoti/Veshti. Women: Saree or Salwar with Dupatta.',
          photographyRules: 'Strictly prohibited inside the temple premises.',
          footwearRules: 'Shoe counters available at the eastern gopuram entrance.',
          generalBehavior: 'Maintain silence while standing before the sacred Sri Chakra.'
        },
        nearbyFacilities: {
          accommodation: ['Regenta Central Kanchipuram', 'MM Hotels Kanchipuram', 'TTDC Hotel Tamil Nadu Kanchipuram'],
          transportation: ['Kanchipuram Railway Station (1.5 km)', 'Chennai International Airport (65 km)', 'Kanchipuram Central Bus Stand (1 km)'],
          food: ['Saravana Bhavan Kanchipuram', 'Hotel Sri Rama Pure Veg', 'Upahar Pure Veg']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/kanchi_kamakshi_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Ekambareswarar Temple (Earth Element)',
        slug: 'ekambareswarar-temple-kanchipuram-earth',
        description: 'The largest temple in Kanchipuram and the premier Pancha Bhoota Sthalam representing the Earth (Prithvi) element. The sanctum enshrines an ancient Earth Lingam (Prithvi Lingam) hand-fashioned out of sand by Goddess Parvati under an ancient mango tree.',
        history: 'Existing since antiquity with mentions in Sangam poems of the 2nd century BCE. The magnificent 59-meter (194-foot) southern Rajagopuram was built by the Vijayanagara Emperor Sri Krishna Devaraya in 1509 CE. Houses a sacred 3,500-year-old mango tree whose four branches yield four different flavored mangoes.',
        deity: 'Lord Shiva (Ekambaranathar) & Goddess Kamakshi',
        location: {
          state: 'Tamil Nadu',
          city: 'Kanchipuram',
          address: 'Ekambaranathar Sannadhi St, Kanchipuram, Tamil Nadu 631502',
          coordinates: { lat: 12.8475, lng: 79.6997 }
        },
        rituals: [
          { name: 'Kala Sandhi', time: '06:00 AM – 07:00 AM', description: 'Morning worship with Vedic chanting.' },
          { name: 'Uchi Kalam', time: '12:00 PM', description: 'Noon worship; note that oil abhishek is never done on the sand lingam.' },
          { name: 'Sayaratchai', time: '06:00 PM', description: 'Evening lamp lighting across the 1,000-pillar hall.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:30 PM',
          evening: '04:00 PM – 08:30 PM',
          specialTimings: 'Panguni Uthiram festival in March/April features the celestial wedding'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest Indian traditional clothing required.',
          photographyRules: 'Permitted in outer massive pillared corridors; prohibited in inner sanctum.',
          footwearRules: 'Deposit shoes at southern gopuram entrance.',
          generalBehavior: 'Do not touch the ancient sand lingam or damage the historic mango tree shrine.'
        },
        nearbyFacilities: {
          accommodation: ['Hotel Baboo Soorya', 'N residency Kanchipuram', 'SSK Grand Kanchipuram'],
          transportation: ['Kanchipuram Railway Station (2 km)', 'Chennai Airport (68 km)', 'Town Auto Stand outside gopuram'],
          food: ['Kanji Pure Veg Mess', 'Aaryas Pure Veg', 'Sri Krishna Sweets']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: false,
        images: [
          '/images/temples/ekambareswarar_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Thillai Nataraja Temple (Ether / Space Element)',
        slug: 'thillai-nataraja-temple-chidambaram-ether',
        description: 'The foremost Shiva temple representing the Space / Ether (Akasha) element among the Pancha Bhoota Sthalams, situated in Chidambaram, Tamil Nadu. It is one of the rare temples where Lord Shiva is worshipped not as a lingam, but as Nataraja performing the eternal cosmic dance of bliss (Ananda Tandava).',
        history: 'Founded in antiquity with monumental contributions from the Imperial Cholas, especially Kings Parantaka I and Kulothunga I who gilded the sanctum roof with solid gold tiles. The sanctum also enshrines the profound Chidambara Rahasya (Secret of Chidambaram) representing the formless omnipresent Divine.',
        deity: 'Lord Shiva (Nataraja) & Goddess Sivakami',
        location: {
          state: 'Tamil Nadu',
          city: 'Chidambaram, Cuddalore',
          address: 'Chidambaram, Cuddalore District, Tamil Nadu 608001',
          coordinates: { lat: 11.3992, lng: 79.6934 }
        },
        rituals: [
          { name: 'Kala Sandhi Abhishek', time: '07:00 AM – 09:00 AM', description: 'Abhishekam of the sacred Ruby Nataraja (Ratnasabhapati) with holy waters and scents.' },
          { name: 'Chidambara Rahasya Darshan', time: 'Daily during pooja times', description: 'Priest pulls aside black silk curtain revealing golden bilva leaves symbolizing empty space / pure consciousness.' },
          { name: 'Ardhajama Pooja', time: '09:30 PM', description: 'Night closing worship with the sacred padukas.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:30 PM',
          evening: '04:30 PM – 10:00 PM',
          specialTimings: 'Grand 10-day Margazhi Thiruvaadhirai and Aani Thirumanjanam festivals'
        },
        festivals: [shivaratriId, natyanjaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict traditional dress code. Men: Dhoti (bare upper body inside inner sanctum); Women: Saree or Salwar with Dupatta.',
          photographyRules: 'Completely prohibited inside the golden mandapa and courtyards.',
          footwearRules: 'Shoe counters outside the four towering Rajagopurams.',
          generalBehavior: 'Managed by the hereditary Dikshitar priesthood who perform rituals following ancient Vedic traditions.'
        },
        nearbyFacilities: {
          accommodation: ['Hotel Saradharam Chidambaram', 'The Grand Park Chidambaram', 'Nataraja Residency'],
          transportation: ['Chidambaram Railway Station (1 km)', 'Tiruchirappalli Airport (140 km)', 'Chennai Airport (220 km)'],
          food: ['Hotel Saradharam Pure Veg', 'Gopu Iyengar Tiffin Center', 'Sri Krishna Vilas']
        },
        category: 'Dravidian Heritage',
        featured: true,
        popular: true,
        images: [
          '/images/temples/thillai_nataraja_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Arunachaleswarar Temple (Fire Element)',
        slug: 'arunachaleswarar-temple-tiruvannamalai-fire',
        description: 'The sacred Pancha Bhoota Sthalam representing the Fire (Agni) element, located at the base of the sacred Arunachala hill in Tiruvannamalai. Renowned worldwide for the sacred 14 km barefoot circumambulation (Girivalam) and as the spiritual sanctuary of Bhagavan Sri Ramana Maharshi.',
        history: 'One of the largest temple complexes in India covering 25 acres with four magnificent Rajagopurams, the eastern one soaring 66 meters (217 feet) built by King Sri Krishna Devaraya in 1516 CE. Mentioned in the 7th-century Tevaram hymns of the Nayanar saints.',
        deity: 'Lord Shiva (Arunachaleswarar / Annamalaiyar) & Unnamalai Amman',
        location: {
          state: 'Tamil Nadu',
          city: 'Tiruvannamalai',
          address: 'Pavazhakundur, Tiruvannamalai, Tamil Nadu 606601',
          coordinates: { lat: 12.2253, lng: 79.0677 }
        },
        rituals: [
          { name: 'Ushakkalam', time: '05:30 AM', description: 'Early morning waking lamps.' },
          { name: 'Kalasandhi', time: '08:00 AM', description: 'Morning abhishekam and archana.' },
          { name: 'Sayaratchai', time: '06:00 PM', description: 'Evening deeparadhana offering.' },
          { name: 'Arthajamam', time: '09:30 PM', description: 'Night closing prayer.' }
        ],
        darshanTimings: {
          morning: '05:30 AM – 12:30 PM',
          evening: '03:30 PM – 09:30 PM',
          specialTimings: 'Continuous opening on Pournami (Full Moon) nights when over 1 million undertake Girivalam'
        },
        festivals: [karthigaiId, shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Traditional Indian clothing. Saree or Chudidar for women; Dhoti or pants with shirt for men.',
          photographyRules: 'Restricted to outer courtyards; strictly prohibited in the inner Sanctum Sanctorum.',
          footwearRules: 'Shoe stalls situated outside all four main gopuram entrances.',
          generalBehavior: 'Walk barefoot in clockwise direction when undertaking the holy 14 km Girivalam circumambulation around Arunachala hill.'
        },
        nearbyFacilities: {
          accommodation: ['Sparsa Resort Tiruvannamalai (Eco Luxury)', 'Arunai Anantha Resort', 'Sri Ramanasramam Guest House'],
          transportation: ['Tiruvannamalai Railway Station (2 km)', 'Chennai International Airport (185 km)', 'Tiruvannamalai Central Bus Terminus (1.5 km)'],
          food: ['Aakash Pure Veg Restaurant', 'Sri Ramana Canteen', 'Abirami Pure Veg']
        },
        category: 'Dravidian Heritage',
        featured: true,
        popular: true,
        images: [
          '/images/temples/arunachaleswarar_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Jambukeswarar Temple (Water Element)',
        slug: 'jambukeswarar-temple-thiruvanaikaval-water',
        description: 'The sacred Pancha Bhoota Sthalam representing the Water (Appu) element, situated in Thiruvanaikaval near Srirangam on the banks of the Kaveri River. An underground natural subterranean spring constantly bubbles up water in the inner sanctum, submerging the Shiva Lingam.',
        history: 'Built over 1,800 years ago by King Kocengannan, an early Chola ruler. Legend recounts that a spider and an elephant (Aanai) worshipped Lord Shiva under the Jambu tree here, earning the town its name Thiruvanaikaval.',
        deity: 'Lord Shiva (Jambukeswarar) & Goddess Akhilandeshwari',
        location: {
          state: 'Tamil Nadu',
          city: 'Thiruvanaikaval, Tiruchirappalli',
          address: 'Thiruvanaikaval, Tiruchirappalli, Tamil Nadu 620005',
          coordinates: { lat: 10.8528, lng: 78.7061 }
        },
        rituals: [
          { name: 'Ushakkalam', time: '06:00 AM', description: 'Early morning holy bath ritual.' },
          { name: 'Uchikalam Pooja', time: '12:00 PM', description: 'The unique ceremony where the temple priest dresses in a saree to worship Jambukeswarar as Goddess Akhilandeshwari herself.' },
          { name: 'Sayaratchai', time: '06:00 PM', description: 'Evening lamp prayer.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:00 PM',
          evening: '04:00 PM – 09:00 PM',
          specialTimings: 'Panguni Brahmotsavam in March/April features chariot procession'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict traditional attire. Men: Dhoti; Women: Saree or Salwar with dupatta.',
          photographyRules: 'Prohibited inside the inner sanctum.',
          footwearRules: 'Shoe stalls available outside primary entrance gate.',
          generalBehavior: 'Observe the perpetual natural spring water trickling around the base of the Shiva Lingam.'
        },
        nearbyFacilities: {
          accommodation: ['Srirangam Yatri Nivas (2 km)', 'SRM Hotel Tiruchirappalli', 'Hotel Sangam Trichy'],
          transportation: ['Tiruchirappalli Junction (8 km)', 'Tiruchirappalli International Airport (13 km)', 'Srirangam Bus Stand (2 km)'],
          food: ['Vasantha Bhavan Pure Veg', 'Sri Krishna Sweets', 'Hotel Tamil Nadu Restaurant']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: false,
        images: [
          '/images/temples/jambukeswarar_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Srikalahasteeswara Temple (Air / Wind Element)',
        slug: 'srikalahasteeswara-temple-air-wind-element',
        description: 'The sacred Pancha Bhoota Sthalam representing the Wind / Air (Vayu) element, situated on the banks of the Swarnamukhi River in Andhra Pradesh. The sanctum houses a Vayu Lingam where a holy flame in the inner windowless sanctum constantly flickers, indicating the perpetual presence of air.',
        history: 'Constructed originally during the Pallava period in the 5th century CE, with monumental expansions by the Cholas and Vijayanagara Emperor Sri Krishna Devaraya in 1516 CE. Renowned globally for Rahu-Ketu Sarpa Dosha Nivarana pujas.',
        deity: 'Lord Shiva (Srikalahasteeswara) & Goddess Gnanaprasunambika',
        location: {
          state: 'Andhra Pradesh',
          city: 'Srikalahasti, Tirupati',
          address: 'Srikalahasti, Tirupati District, Andhra Pradesh 517644',
          coordinates: { lat: 13.7498, lng: 79.6984 }
        },
        rituals: [
          { name: 'Suprabhatam', time: '05:30 AM', description: 'Early morning waking chant.' },
          { name: 'Rahu Ketu Sarpa Dosha Nivarana Pooja', time: '06:00 AM – 06:00 PM (Continuous)', description: 'World-famous Vedic remedial puja performed in specialized temple halls.' },
          { name: 'Sayana Seva', time: '09:00 PM', description: 'Night closing prayer.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:30 PM',
          evening: '03:30 PM – 09:00 PM',
          specialTimings: 'Continuous darshan on Maha Shivaratri'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Traditional Indian attire mandatory for Rahu-Ketu pujas. Men: Dhoti; Women: Saree or Chudidar.',
          photographyRules: 'Strictly prohibited inside the temple premises.',
          footwearRules: 'Shoe counters outside the Rajagopuram.',
          generalBehavior: 'Observe the flickering ghee lamps inside the inner windowless sanctum.'
        },
        nearbyFacilities: {
          accommodation: ['Devasthanam Yatri Niwas Srikalahasti', 'Hotel MGM Grand Srikalahasti', 'Hotels in Tirupati (36 km)'],
          transportation: ['Srikalahasti Railway Station (2.5 km)', 'Tirupati International Airport (25 km)', 'Tirupati Central Bus Stand (36 km)'],
          food: ['Devasthanam Free Annadanam Hall', 'Hotel Saravana Bhavan Srikalahasti', 'Bhimas Deluxe']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/srikalahasti_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Sun Temple (Modhera)',
        slug: 'sun-temple-modhera-gujarat',
        description: 'An 11th-century architectural masterpiece dedicated to the Sun God Surya, situated on the banks of the Pushpavati River in Modhera, Gujarat. Built in the Solanki (Maru-Gurjara) style, it is aligned so that the first rays of the rising sun at the equinoxes illuminated the inner sanctum.',
        history: 'Commissioned in 1026–27 CE by King Bhima I of the Solanki Dynasty. Although now a non-functioning protected monument under the ASI, its monumental stepped reservoir (Surya Kund) featuring 108 miniature shrines and the intricately carved Sabha Mandap remain an awe-inspiring wonder of medieval Indian engineering.',
        deity: 'Lord Surya (Sun God)',
        location: {
          state: 'Gujarat',
          city: 'Modhera, Mehsana',
          address: 'On, Becharaji - Highway, Modhera, Gujarat 384212',
          coordinates: { lat: 23.5835, lng: 72.1331 }
        },
        rituals: [
          { name: 'Equinox Sunrise Viewing', time: '06:00 AM', description: 'Sunlight strikes the central axis of the Sabha Mandap.' },
          { name: 'Heritage Evening Illumination', time: '07:00 PM – 08:30 PM', description: 'Magnificent LED lighting highlighting the stepped tank architecture.' }
        ],
        darshanTimings: {
          morning: '07:00 AM – 12:00 PM',
          evening: '12:00 PM – 06:00 PM',
          specialTimings: 'Annual Modhera Dance Festival in January transforms the stepped reservoir into an open-air amphitheater'
        },
        festivals: [modheraDanceId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Comfortable tourist clothing. Modest attire appreciated.',
          photographyRules: 'Photography allowed throughout the monument and Surya Kund; tripods require ASI permission.',
          footwearRules: 'Removal required on elevated sanctum plinths.',
          generalBehavior: 'Do not climb or deface the ancient stone relief sculptures.'
        },
        nearbyFacilities: {
          accommodation: ['Toran Cafeteria & Guest House Modhera', 'The Fern Residency Mehsana', 'Shankus Water Park & Resort'],
          transportation: ['Mehsana Railway Station (25 km)', 'Sardar Vallabhbhai Patel International Airport Ahmedabad (95 km)', 'State Highway 7'],
          food: ['Toran Restaurant Modhera', 'Kathiyawadi Dhaba Mehsana', 'Honest Restaurant Highway']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: false,
        images: [
          '/images/temples/modhera_sun_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Dilwara Jain Temples',
        slug: 'dilwara-jain-temples-mount-abu-rajasthan',
        description: 'World-renowned for their extraordinary pure white marble stone carvings, the Dilwara Temples are situated 2.5 km from Mount Abu, Rajasthan\'s only hill station. The ceilings, doorways, pillars, and panels feature lace-like filigree carving so delicate that it almost appears transparent.',
        history: 'Built between the 11th and 13th centuries CE by ministers Vimal Shah (Vimal Vasahi) and brothers Vastupala and Tejapala (Luna Vasahi) under the Chalukyas of Gujarat. Craftsmen were reportedly paid by the weight of marble dust they carved away, encouraging unmatched delicate detail.',
        deity: 'Lord Rishabhanatha (Adinatha) & Lord Neminatha',
        location: {
          state: 'Rajasthan',
          city: 'Mount Abu, Sirohi',
          address: 'Delwara, Mount Abu, Sirohi District, Rajasthan 307501',
          coordinates: { lat: 24.6038, lng: 72.7231 }
        },
        rituals: [
          { name: 'Pratah Jinendra Pooja', time: '06:00 AM – 11:30 AM', description: 'Sacred worship offering to the 24 Tirthankaras.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 12:00 PM (Devotees)',
          evening: '12:00 PM – 05:00 PM (General Tourists)',
          specialTimings: 'Non-Jain visitors permitted daily after 12:00 PM'
        },
        festivals: [diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict conservative dress code: shoulders and knees must be fully covered. No leather belts, wallets, or shoes.',
          photographyRules: 'Strictly prohibited anywhere inside the temple complex to preserve the sanctity.',
          footwearRules: 'Shoes must be deposited outside.',
          generalBehavior: 'Maintain absolute silence in the marble corridors.'
        },
        nearbyFacilities: {
          accommodation: ['Cama Rajputana Club Resort Mount Abu', 'Hotel Hilltone Mount Abu', 'Dilwara Dharamshala'],
          transportation: ['Abu Road Railway Station (28 km)', 'Maharana Pratap Airport Udaipur (185 km)', 'Ahmedabad Airport (220 km)'],
          food: ['Arbuda Restaurant Mount Abu', 'Chacha Cafe', 'Jain Bhojanalaya Dilwara']
        },
        category: 'UNESCO World Heritage',
        featured: false,
        popular: false,
        images: [
          '/images/temples/dilwara_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Kalighat Kali Temple',
        slug: 'kalighat-kali-temple-kolkata-bengal',
        description: 'One of the 51 sacred Shakti Peethas of Hinduism, situated along the sacred Adi Ganga canal in Kolkata. It is believed that the four toes of the right foot of Goddess Sati fell here when Lord Vishnu severed her body with the Sudarshana Chakra.',
        history: 'Mentioned in 15th-century Bengali literature such as Mansa Bhasan. The present Bengal-style temple with its sloping four-sided chala roof was constructed in 1809 by the Sabarna Roy Choudhury family. The unique black stone idol of Kali features three huge red eyes, a long golden tongue, and four golden arms.',
        deity: 'Goddess Kali (Dakshina Kalika)',
        location: {
          state: 'West Bengal',
          city: 'Kolkata',
          address: 'Anami Sangha, Kalighat, Kolkata, West Bengal 700026',
          coordinates: { lat: 22.5204, lng: 88.3426 }
        },
        rituals: [
          { name: 'Mangala Aarti', time: '05:30 AM', description: 'Early morning awakening lamps.' },
          { name: 'Bhog Aarti', time: '02:30 PM – 03:30 PM', description: 'Noon sacred Mahaprasad offering.' },
          { name: 'Sandhya Aarti', time: '07:00 PM – 08:00 PM', description: 'Evening devotional chanting with bells and cymbals.' }
        ],
        darshanTimings: {
          morning: '05:00 AM – 02:00 PM',
          evening: '05:00 PM – 10:30 PM',
          specialTimings: 'Open throughout the night on Kali Puja / Diwali night'
        },
        festivals: [navaratriId, diwaliId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Modest Indian attire recommended.',
          photographyRules: 'Strictly prohibited inside the sanctum sanctorum.',
          footwearRules: 'Shoe counters outside the Natmandir entrance.',
          generalBehavior: 'Be vigilant against unofficial touts outside the temple lanes.'
        },
        nearbyFacilities: {
          accommodation: ['The Oberoi Grand Kolkata', 'Taj Bengal Kolkata', 'Hotel Kalighat International'],
          transportation: ['Kalighat Metro Station (500 m)', 'Howrah Railway Station (10 km)', 'Netaji Subhash Chandra Bose Airport (22 km)'],
          food: ['Kalighat Mahaprasad Counter', 'Bhojohori Manna Hazra', 'Kewpie\'s Kitchen']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: true,
        images: [
          '/images/temples/kalighat_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Guruvayur Sri Krishna Temple',
        slug: 'guruvayur-sri-krishna-temple-kerala',
        description: 'Revered as the "Bhuloka Vaikunta" (Abode of Lord Vishnu on Earth), this legendary Krishna temple in Thrissur, Kerala is one of the most visited and venerated Vaishnavite pilgrimage shrines in South India.',
        history: 'Legend says the sacred four-armed idol of Lord Krishna (carved from Patala Anjana stone) was installed by Guru (preceptor of the Devas) and Vayu (God of Wind) at the start of the Kali Yuga. Famous for its Elephant Sanctuary (Punnathur Kotta) housing over 40 majestic temple tuskers.',
        deity: 'Lord Sri Krishna (Guruvayurappan)',
        location: {
          state: 'Kerala',
          city: 'Guruvayur, Thrissur',
          address: 'East Nada, Guruvayur, Thrissur District, Kerala 680101',
          coordinates: { lat: 10.5947, lng: 76.0387 }
        },
        rituals: [
          { name: 'Nirmalyam', time: '03:00 AM', description: 'Early morning holy darshan with flower garlands of previous day.' },
          { name: 'Seeveli', time: '07:00 AM, 04:30 PM & 08:30 PM', description: 'Grand circumambulation of the deity atop caparisoned temple elephants.' },
          { name: 'Uchapooja', time: '12:00 PM – 12:30 PM', description: 'Midday grand naivedyam.' },
          { name: 'Thrippuka', time: '09:00 PM', description: 'Night fumigation of the sanctum with herbal incense before closing.' }
        ],
        darshanTimings: {
          morning: '03:00 AM – 01:30 PM',
          evening: '04:30 PM – 09:15 PM',
          specialTimings: 'Open continuously on Janmashtami and Guruvayur Ekadashi'
        },
        festivals: [janmashtamiId, guruvayurEkadashiId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Strict Kerala traditional attire. Men: Mundu around the waist (bare upper body); Women: Saree, Set-mundu, or Salwar with Dupatta.',
          photographyRules: 'Strictly prohibited. All electronics and phones must be deposited outside.',
          footwearRules: 'Footwear strictly disallowed within the entire temple perimeter.',
          generalBehavior: 'Adhere to queue discipline. Only Hindus are permitted entry into the sanctum sanctorum.'
        },
        nearbyFacilities: {
          accommodation: ['Sreevalsam Guest House Guruvayur', 'KTDC Tamarind Guruvayur', 'Hotel Sopanam Heritage'],
          transportation: ['Guruvayur Railway Station (1 km)', 'Thrissur Railway Station (28 km)', 'Cochin International Airport (80 km)'],
          food: ['Guruvayur Devaswom Free Annadanam Hall', 'Surabhi Pure Veg', 'Saravana Bhavan Guruvayur']
        },
        category: 'Dravidian Heritage',
        featured: true,
        popular: true,
        images: [
          '/images/temples/guruvayur_temple.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Kukke Subramanya Temple',
        slug: 'kukke-subramanya-temple-karnataka',
        description: 'Nestled amidst the lush Western Ghats under the majestic Kumara Parvatha mountain in Dakshina Kannada, this sacred pilgrimage is dedicated to Lord Kartikeya (Subramanya), the Lord of Serpents. Pilgrims visit from across India for Sarpa Dosha Nivarana pujas.',
        history: 'According to legend, the divine serpent king Vasuki took refuge here and performed penance, receiving protection from Lord Subramanya against Garuda. Blessed by Adi Shankaracharya who referred to it as "Bhaje Kukke Lingam".',
        deity: 'Lord Subramanya (Kartikeya / Shanmukha) & Vasuki',
        location: {
          state: 'Karnataka',
          city: 'Subramanya, Sullia, Dakshina Kannada',
          address: 'Subramanya, Dakshina Kannada District, Karnataka 574238',
          coordinates: { lat: 12.6631, lng: 75.6178 }
        },
        rituals: [
          { name: 'Usha Kala Pooja', time: '06:00 AM – 07:00 AM', description: 'Early morning holy prayer.' },
          { name: 'Ashlesha Bali & Sarpa Samskara', time: '07:30 AM & 05:00 PM', description: 'Sacred remedial serpent rituals performed by Vedic priests.' },
          { name: 'Maha Pooja', time: '12:00 PM', description: 'Midday grand worship and offering.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:30 PM',
          evening: '03:30 PM – 08:30 PM',
          specialTimings: 'Champa Shasthi festival in November/December attracts hundreds of thousands'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Men must remove shirts and vests before entering inner sanctum. Women must wear Saree or Salwar with dupatta.',
          photographyRules: 'Prohibited inside sanctum precincts.',
          footwearRules: 'Shoe counters available outside temple premises.',
          generalBehavior: 'Devotees customarily take a holy dip in the sacred Kumaradhara River before entering the shrine.'
        },
        nearbyFacilities: {
          accommodation: ['Kukke Temple Trust Guest Houses (Ashlesha, Skanda, Kumarakripa)', 'Hotel SLR Comforts', 'Vyasaraja Matha Choultry'],
          transportation: ['Subramanya Road Railway Station (SBHR, 12 km)', 'Mangalore International Airport (115 km)', 'KSRTC direct buses from Bangalore and Mangalore'],
          food: ['Temple Trust Free Annadanam Hall', 'Neo Mysore Cafe Pure Veg', 'Sri Krishna Pure Veg']
        },
        category: 'Dravidian Heritage',
        featured: false,
        popular: false,
        images: [
          '/images/temples/kukke_subramanya.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      },
      {
        name: 'Murudeshwar Temple',
        slug: 'murudeshwar-temple-karnataka',
        description: 'Surrounded on three sides by the turquoise waters of the Arabian Sea on the coast of Karnataka, Murudeshwar is home to the world\'s second tallest statue of Lord Shiva (123 feet / 37 meters) and a monumental 20-storied Rajagopuram (249 feet) featuring a public elevator to the top floor.',
        history: 'Connected to the epic Ramayana legend of the Atma-Linga dropped by Ravana. Expanded into a modern marvel by philanthropist R. N. Shetty, featuring a subterranean museum cave beneath the gigantic Shiva statue depicting Puranic stories.',
        deity: 'Lord Shiva (Murudeshwar)',
        location: {
          state: 'Karnataka',
          city: 'Murudeshwar, Bhatkal, Uttara Kannada',
          address: 'Bhatkal Taluk, Murudeshwar, Karnataka 581350',
          coordinates: { lat: 14.0944, lng: 74.4849 }
        },
        rituals: [
          { name: 'Morning Abhishekam', time: '06:00 AM – 07:00 AM', description: 'Early morning sacred milk abhishekam.' },
          { name: 'Maha Pooja', time: '12:00 PM – 01:00 PM', description: 'Noon prayer service.' },
          { name: 'Night Harathi', time: '08:00 PM', description: 'Evening prayer against coastal sea breezes.' }
        ],
        darshanTimings: {
          morning: '06:00 AM – 01:00 PM',
          evening: '03:00 PM – 08:30 PM',
          specialTimings: 'Rajagopuram lift operates from 06:00 AM to 08:00 PM'
        },
        festivals: [shivaratriId].filter(Boolean),
        visitorGuidelines: {
          dressCode: 'Comfortable, modest beach and temple attire. Shoulders and knees must be covered inside the sanctum.',
          photographyRules: 'Photography permitted in outer grounds and atop Rajagopuram; prohibited inside the Shiva lingam sanctum.',
          footwearRules: 'Shoe counters situated outside the 20-story Rajagopuram gate.',
          generalBehavior: 'Take the elevator to the 18th floor of the Rajagopuram for panoramic views of the Arabian Sea and the giant Shiva statue.'
        },
        nearbyFacilities: {
          accommodation: ['RNS Residency Murudeshwar (Beachfront)', 'Naveen Beach Resort', 'RNS Highway Hotel'],
          transportation: ['Murudeshwar Railway Station (2 km)', 'Mangalore International Airport (155 km)', 'Goa Dabolim Airport (195 km)'],
          food: ['Naveen Seaside Restaurant', 'Suraj Pure Veg', 'Kamath Yatri Nivas']
        },
        category: 'Cave & Rock-Cut',
        featured: true,
        popular: true,
        images: [
          '/images/temples/murudeshwar.jpg'
        ],
        verificationStatus: 'VERIFIED',
        published: true
      }
    ];

    const createdTemples = await Temple.insertMany(templesData);
    console.log(`Seeded ${createdTemples.length} verified sacred temples.`);

    // Map temples to IDs
    const kashi = createdTemples.find(t => t.slug.includes('kashi'));
    const kedarnath = createdTemples.find(t => t.slug.includes('kedarnath'));
    const badrinath = createdTemples.find(t => t.slug.includes('badrinath'));
    const somnath = createdTemples.find(t => t.slug.includes('somnath'));
    const rameswaram = createdTemples.find(t => t.slug.includes('rameswaram'));
    const meenakshi = createdTemples.find(t => t.slug.includes('meenakshi'));
    const brihadeeswarar = createdTemples.find(t => t.slug.includes('brihadeeswarar'));
    const tirupati = createdTemples.find(t => t.slug.includes('tirupati'));
    const jagannath = createdTemples.find(t => t.slug.includes('jagannath'));
    const konark = createdTemples.find(t => t.slug.includes('konark'));
    const mahakal = createdTemples.find(t => t.slug.includes('mahakaleshwar'));
    const dwarka = createdTemples.find(t => t.slug.includes('dwarkadhish'));
    const vaishnodevi = createdTemples.find(t => t.slug.includes('vaishno-devi'));
    const ranakpur = createdTemples.find(t => t.slug.includes('ranakpur'));
    const hoysala = createdTemples.find(t => t.slug.includes('hoysaleswara'));
    const kailasa = createdTemples.find(t => t.slug.includes('kailasa'));
    const lingaraj = createdTemples.find(t => t.slug.includes('lingaraj'));
    const sabarimala = createdTemples.find(t => t.slug.includes('sabarimala'));
    const srirangam = createdTemples.find(t => t.slug.includes('ranganathaswamy'));
    const trimbak = createdTemples.find(t => t.slug.includes('trimbakeshwar'));
    const kamakhya = createdTemples.find(t => t.slug.includes('kamakhya'));
    const dakshineswar = createdTemples.find(t => t.slug.includes('dakshineswar'));
    const virupaksha = createdTemples.find(t => t.slug.includes('virupaksha'));
    const padmanabha = createdTemples.find(t => t.slug.includes('padmanabhaswamy'));
    const mahabodhi = createdTemples.find(t => t.slug.includes('mahabodhi'));
    const khajuraho = createdTemples.find(t => t.slug.includes('kandariya'));
    const ramappa = createdTemples.find(t => t.slug.includes('ramappa'));
    const golden = createdTemples.find(t => t.slug.includes('golden-temple'));
    const omkareshwar = createdTemples.find(t => t.slug.includes('omkareshwar'));
    const baidyanath = createdTemples.find(t => t.slug.includes('baidyanath'));
    const mallikarjuna = createdTemples.find(t => t.slug.includes('mallikarjuna'));
    const bhimashankar = createdTemples.find(t => t.slug.includes('bhimashankar'));
    const grishneshwar = createdTemples.find(t => t.slug.includes('grishneshwar'));
    const nageshwar = createdTemples.find(t => t.slug.includes('nageshwar'));
    const gangotri = createdTemples.find(t => t.slug.includes('gangotri'));
    const yamunotri = createdTemples.find(t => t.slug.includes('yamunotri'));
    const kamakshi = createdTemples.find(t => t.slug.includes('kamakshi'));
    const ekambareswarar = createdTemples.find(t => t.slug.includes('ekambareswarar'));
    const chidambaram = createdTemples.find(t => t.slug.includes('chidambaram'));
    const arunachaleswarar = createdTemples.find(t => t.slug.includes('arunachaleswarar'));
    const jambukeswarar = createdTemples.find(t => t.slug.includes('jambukeswarar'));
    const kalahasti = createdTemples.find(t => t.slug.includes('kalahast'));
    const modhera = createdTemples.find(t => t.slug.includes('modhera'));
    const dilwara = createdTemples.find(t => t.slug.includes('dilwara'));
    const kalighat = createdTemples.find(t => t.slug.includes('kalighat'));
    const guruvayur = createdTemples.find(t => t.slug.includes('guruvayur'));
    const kukke = createdTemples.find(t => t.slug.includes('kukke'));
    const murudeshwar = createdTemples.find(t => t.slug.includes('murudeshwar'));

    // 3. Seed Verified Pilgrimage Circuits
    const circuitsData = [
      {
        name: 'The Sacred Char Dham Yatra',
        region: 'Pan-India',
        description: 'The four holy abodes defined by the great saint Adi Shankaracharya in the four cardinal directions of India: Badrinath (North), Rameswaram (South), Jagannath Puri (East), and Dwarkadhish (West). Completing this supreme circuit is revered as the ultimate milestone of Hindu pilgrimage.',
        temples: [badrinath?._id, rameswaram?._id, jagannath?._id, dwarka?._id].filter(Boolean),
        suggestedOrder: [
          'Puri Jagannath Temple (East - Odisha)',
          'Ramanathaswamy Temple, Rameswaram (South - Tamil Nadu)',
          'Dwarkadhish Temple, Dwarka (West - Gujarat)',
          'Badrinath Temple, Chamoli (North - Uttarakhand)'
        ]
      },
      {
        name: '12 Jyotirlinga Complete Sacred Circuit',
        region: 'Pan-India',
        description: 'The complete sacred pilgrimage honoring the 12 self-manifested (Swayambhu) pillars of divine cosmic light (Jyotirlingas) of Lord Shiva spread across ancient Indian holy shrines, embodying supreme consciousness and spiritual liberation.',
        temples: [
          somnath?._id,
          mallikarjuna?._id,
          mahakal?._id,
          omkareshwar?._id,
          kedarnath?._id,
          bhimashankar?._id,
          kashi?._id,
          trimbak?._id,
          baidyanath?._id,
          nageshwar?._id,
          rameswaram?._id,
          grishneshwar?._id
        ].filter(Boolean),
        suggestedOrder: [
          'Somnath Jyotirlinga (Veraval, Gujarat)',
          'Mallikarjuna Jyotirlinga (Srisailam, Andhra Pradesh)',
          'Mahakaleshwar Jyotirlinga (Ujjain, Madhya Pradesh)',
          'Omkareshwar Jyotirlinga (Mandhata, Madhya Pradesh)',
          'Kedarnath Jyotirlinga (Rudraprayag, Uttarakhand)',
          'Bhimashankar Jyotirlinga (Pune, Maharashtra)',
          'Kashi Vishwanath Jyotirlinga (Varanasi, Uttar Pradesh)',
          'Trimbakeshwar Jyotirlinga (Nashik, Maharashtra)',
          'Baba Baidyanath Jyotirlinga (Deoghar, Jharkhand)',
          'Nageshwar Jyotirlinga (Dwarka, Gujarat)',
          'Ramanathaswamy Jyotirlinga (Rameswaram, Tamil Nadu)',
          'Grishneshwar Jyotirlinga (Verul, Maharashtra)'
        ]
      },
      {
        name: 'Uttarakhand Chota Char Dham Yatra',
        region: 'Himalayas / North India',
        description: 'The venerable high-altitude pilgrimage circuit nestled in the Garhwal Himalayas of Uttarakhand, encompassing the divine origins of the sacred rivers Yamuna and Ganga, along with the abodes of Lord Shiva and Lord Vishnu.',
        temples: [yamunotri?._id, gangotri?._id, kedarnath?._id, badrinath?._id].filter(Boolean),
        suggestedOrder: [
          'Yamunotri Temple (Sacred source of the Yamuna River)',
          'Gangotri Temple (Sacred source of the Bhagirathi / Ganga River)',
          'Kedarnath Temple (Highest Jyotirlinga of Lord Shiva)',
          'Badrinath Temple (Supreme Vaikunta on Earth in Chamoli)'
        ]
      },
      {
        name: 'Pancha Bhoota Sthalam (Five Elements Circuit)',
        region: 'South India',
        description: 'The ancient and revered circuit of five South Indian temples where Lord Shiva is manifested as the five cardinal elements of nature: Earth (Prithvi), Water (Appu), Fire (Agni), Wind (Vayu), and Space / Ether (Akasha).',
        temples: [ekambareswarar?._id, jambukeswarar?._id, arunachaleswarar?._id, kalahasti?._id, chidambaram?._id].filter(Boolean),
        suggestedOrder: [
          'Ekambareswarar Temple, Kanchipuram (Earth Element - Prithvi Lingam)',
          'Jambukeswarar Temple, Thiruvanaikaval (Water Element - Appu Lingam)',
          'Arunachaleswarar Temple, Tiruvannamalai (Fire Element - Agni Lingam)',
          'Srikalahasteeswara Temple, Srikalahasti (Wind Element - Vayu Lingam)',
          'Thillai Nataraja Temple, Chidambaram (Space/Ether Element - Akasha / Chidambara Rahasya)'
        ]
      },
      {
        name: 'Dravidian Heritage & Temple Architecture Trail',
        region: 'South India',
        description: 'An architectural and devotional journey through the soaring Gopurams, thousand-pillared halls, monolithic sculptures, and sacred temple tanks of the historic Pallava, Chola, Pandya, Chera, and Vijayanagara dynasties.',
        temples: [meenakshi?._id, brihadeeswarar?._id, tirupati?._id, rameswaram?._id, srirangam?._id, padmanabha?._id, guruvayur?._id, arunachaleswarar?._id, kukke?._id, murudeshwar?._id].filter(Boolean),
        suggestedOrder: [
          'Venkateswara Temple, Tirupati (Andhra Pradesh)',
          'Sri Ranganathaswamy Temple, Srirangam (Tamil Nadu)',
          'Brihadeeswarar Temple, Thanjavur (Tamil Nadu)',
          'Arunachaleswarar Temple, Tiruvannamalai (Tamil Nadu)',
          'Meenakshi Amman Temple, Madurai (Tamil Nadu)',
          'Ramanathaswamy Temple, Rameswaram (Tamil Nadu)',
          'Padmanabhaswamy Temple, Thiruvananthapuram (Kerala)',
          'Guruvayur Sri Krishna Temple (Kerala)',
          'Kukke Subramanya Temple (Karnataka)',
          'Murudeshwar Temple & Giant Shiva Statue (Karnataka)'
        ]
      },
      {
        name: 'Odisha Sacred Golden Triangle',
        region: 'Eastern India',
        description: 'The venerated spiritual and architectural triangle connecting the Sun God of Konark, Lord of the Universe Jagannath of Puri, and Lord Lingaraj of Bhubaneswar along the Bay of Bengal.',
        temples: [lingaraj?._id, konark?._id, jagannath?._id].filter(Boolean),
        suggestedOrder: [
          'Lingaraj Temple, Bhubaneswar',
          'Konark Sun Temple, Konark',
          'Jagannath Temple, Puri'
        ]
      },
      {
        name: 'Divine Shakti Peetha Pilgrimage',
        region: 'Pan-India',
        description: 'A sacred circuit honoring the prime manifestations of the Divine Mother (Adi Parashakti), where body parts of Goddess Sati fell across the sacred geography of Bharatvarsha.',
        temples: [kamakhya?._id, vaishnodevi?._id, kalighat?._id, kamakshi?._id, dakshineswar?._id, meenakshi?._id].filter(Boolean),
        suggestedOrder: [
          'Kamakhya Temple, Guwahati (Assam - Yoni Peetha)',
          'Mata Vaishno Devi Temple, Katra (Jammu & Kashmir)',
          'Kalighat Kali Temple, Kolkata (West Bengal)',
          'Dakshineswar Kali Temple, Kolkata (West Bengal)',
          'Kanchi Kamakshi Amman Temple, Kanchipuram (Tamil Nadu)',
          'Meenakshi Amman Temple, Madurai (Tamil Nadu)'
        ]
      },
      {
        name: 'UNESCO World Heritage Architectural Circuit',
        region: 'Pan-India',
        description: 'A grand tour of India\'s globally acclaimed monument temples recognized by UNESCO for monumental stone engineering, rock-cut architecture, and timeless artistic genius.',
        temples: [kailasa?._id, hoysala?._id, virupaksha?._id, konark?._id, modhera?._id, brihadeeswarar?._id, mahabodhi?._id, khajuraho?._id, ramappa?._id, dilwara?._id, golden?._id].filter(Boolean),
        suggestedOrder: [
          'Kailasa Temple, Ellora Caves (Maharashtra)',
          'Sun Temple, Modhera (Gujarat)',
          'Dilwara Jain Temples, Mount Abu (Rajasthan)',
          'Hoysaleswara Temple, Halebidu (Karnataka)',
          'Virupaksha Temple, Hampi (Karnataka)',
          'Brihadeeswarar Temple, Thanjavur (Tamil Nadu)',
          'Ramappa Temple, Palampet (Telangana)',
          'Konark Sun Temple (Odisha)',
          'Mahabodhi Temple, Bodh Gaya (Bihar)',
          'Kandariya Mahadeva Temple, Khajuraho (Madhya Pradesh)',
          'Harmandir Sahib Golden Temple, Amritsar (Punjab)'
        ]
      }
    ];

    const createdCircuits = await PilgrimageCircuit.insertMany(circuitsData);
    console.log(`Seeded ${createdCircuits.length} iconic pilgrimage circuits.`);

    // 4. Ensure Administrator Account
    const adminEmail = 'deepakbalan26@gmail.com';
    let adminUser = await User.findOne({ email: adminEmail });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@TempleYatra2026', salt);

    if (adminUser) {
      adminUser.role = 'admin';
      adminUser.passwordHash = passwordHash;
      await adminUser.save();
      console.log(`Updated existing user ${adminEmail} to role: 'admin'.`);
    } else {
      adminUser = await User.create({
        name: 'Deepak B',
        email: adminEmail,
        passwordHash,
        role: 'admin'
      });
      console.log(`Created primary admin account for ${adminEmail}.`);
    }

    console.log('\n=========================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY ');
    console.log(` Temples in DB: ${createdTemples.length}`);
    console.log(` Festivals in DB: ${createdFestivals.length}`);
    console.log(` Circuits in DB: ${createdCircuits.length}`);
    console.log(` Admin Login: ${adminEmail} / Admin@TempleYatra2026`);
    console.log('=========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
