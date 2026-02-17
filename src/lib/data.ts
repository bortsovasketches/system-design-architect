import {
    Activity, ArrowRight, Box, Brain, Building2, Calculator, Calendar, Camera, Car, Check, ChevronLeft, ChevronRight,
    Circle, Clock, Cloud, Code, Copy, Cpu, CreditCard, Bot, Database, Download, Film, Globe, Hammer, HardDrive, Hash, History,
    Home, Layout, Library, Lightbulb, Lock, Maximize2, Menu, MessageCircle, MessageSquare, Monitor, Moon,
    MoreHorizontal, MousePointer, Music, Network, Package, Play, RefreshCw, Save, Search, Server, Settings,
    Share2, Shield, Smartphone, Sparkles, Sun, Terminal, ThumbsUp, Trash2, Truck, User, Users, Video, Wifi, Zap,
    Twitter, Youtube, ShoppingBag, Link, GitBranch, ShipWheel
} from 'lucide-react';

export type DesignLevel = 'eli5' | 'intermediate' | 'senior';

export interface DesignContent {
    overview: string;
    points: string[];
    overview_tech?: string;
    points_tech?: string[];
    diagram: string;
    metrics?: Record<string, string>;
}

export interface DesignSystem {
    eli5: DesignContent;
    intermediate: DesignContent;
    senior: DesignContent;
}

// Full library of generic services
export const SYSTEM_DESIGN_DATA: Record<string, DesignSystem> = {
    "default": {
        eli5: {
            overview: "We need a URL to start! Imagine this is like telling a taxi driver where to go options.",
            points: [
                "**The Address (URL)**: Without a destination, we can't take you anywhere.",
                "**The Passenger (User)**: That's you! Ready to start the journey.",
                "**The Map (System)**: We are waiting to generate the route."
            ],
            diagram: "graph TD\nUser-->Thinking\nThinking-->Idea\nIdea-->URL",
            metrics: { difficulty: "Very Easy", time: "Instant" }
        },
        intermediate: {
            overview: "Waiting for input. The system is currently in an idle state.",
            points: [
                "**Idle State**: System is listening for user events.",
                "**Input Handler**: Ready to parse URL parameters.",
                "**Rendering Engine**: Standby mode active."
            ],
            diagram: "stateDiagram-v2\n[*] --> Idle\nIdle --> InputReceived\nInputReceived --> Processing",
            metrics: { status: "IDLE", load: "0%" }
        },
        senior: {
            overview: "System is in idle state, polling for user interaction events via the event loop.",
            points: [
                "**Event Loop**: Blocking on main thread waiting for I/O.",
                "**State Machine**: Currently in [IDLE] transitions to [PROCESSING] on signal.",
                "**Resource Monitor**: CPU usage < 1%, Memory allocation minimal."
            ],
            diagram: "stateDiagram-v2\n[*] --> Idle\nIdle --> InputReceived\nInputReceived --> Processing",
            metrics: { status: "IDLE", load: "0%" }
        }
    },
    "micro-blogging": {
        eli5: {
            overview: "Think of this like a giant digital bulletin board where millions of people stick small notes every second.",
            points: [
                "**The Phone (App)**: This is like your pen and paper. You write a note.",
                "**The Postman (API)**: Takes your note and runs it to the bulletin board.",
                "**The Bulletin Board (Database)**: A huge wall where all notes are stuck.",
                "**The Followers**: Copies of your note are put in your friends' mailboxes."
            ],
            diagram: "graph TD\nUser[User You]-->App[Phone App]\nApp-->Postman[API Server]\nPostman-->Board[Database]\nPostman-->Friends[Followers Feeds]",
            metrics: { difficulty: "Easy", scale: "Global" }
        },
        intermediate: {
            overview: "At a product level, this is a 'Real-Time Newsfeed' application.",
            points: [
                "**Posting Flow**: User sends text -> Validated -> Stored.",
                "**Reading Flow**: User opens app -> System fetches latest posts from followed users.",
                "**Fan-out Problem**: When a celebrity posts, push to millions of caches."
            ],
            diagram: "graph TD\nClient-->LB[Load Balancer]\nLB-->API[API Gateway]\nAPI-->Tweet[Post Svc]\nTweet-->DB[(Post DB)]\nTweet-->FanOut[Fan-out Svc]\nFanOut-->Cache[(Redis Cache)]",
            metrics: { complexity: "High", latency: "Sub-50ms" }
        },
        senior: {
            overview: "A classic Read-Heavy system (100:1 read:write) utilizing hybrid fan-out strategies.",
            points: [
                "**Hybrid Fan-out**: Push for regular users; Pull for celebrities.",
                "**Storage Strategy**: Immutable posts, stored in sharded NoSQL (Cassandra).",
                "**Search Index**: Inverted index (Lucene) for real-time discovery."
            ],
            diagram: "graph TD\nClient-->CDN\nCDN-->LB\nLB-->Gateway\nGateway-->WriteSvc\nWriteSvc-->MQ{Kafka}\nMQ-->Fanout\nFanout-->Redis[(Redis)]\nWriteSvc-->Cassandra[(Cassandra)]",
            metrics: { qps: "500k+", consistency: "Eventual", database: "Cassandra + Redis" }
        }
    },
    "video-streaming": {
        eli5: {
            overview: "This system is like a super-advanced video store delivered by a pipe directly to your screen.",
            points: [
                "**The Library**: All movies are stored in a huge digital vault (Cloud Storage).",
                "**The Chef (Transcoder)**: Chops movies into tiny pieces and cooks them in different sizes.",
                "**The Delivery Trucks (CDN)**: Copies pieces to garages near your house for instant play."
            ],
            diagram: "graph TD\nMovie-->Chef[Transcoder]\nChef-->PhoneVersion\nChef-->TVVersion\nVersions-->Trucks[CDN Servers]\nTrucks-->YourHouse",
            metrics: { bandwidth: "Massive", type: "Streaming" }
        },
        intermediate: {
            overview: "A Video-on-Demand (VoD) platform focusing on efficient content delivery.",
            points: [
                "**Content Delivery Network**: Appliances placed inside ISPs to serve video locally.",
                "**Adaptive Bitrate**: Player switches quality (480p, 4K) based on speed.",
                "**Manifest File**: A playlist telling the player which chunks to download."
            ],
            diagram: "graph TD\nApp-->API\nAPI-->MetadataDB[(Movie Info)]\nApp-->CDN[Open Connect CDN]\nCDN-->VideoChunks\nApp-->Analytics",
            metrics: { storage: "Petabytes", strategy: "Pre-fetching" }
        },
        senior: {
            overview: "Prioritizes Availability and Low Latency using a Microservices architecture.",
            points: [
                "**BFF Pattern**: Backend-for-Frontend aggregates data for specific devices.",
                "**Video Pipeline**: Archer/Mezzanine pipeline encodes into DASH/HLS segments.",
                "**Resilience**: Chaos Engineering randomly kills services to ensure failover."
            ],
            diagram: "graph TD\nClient-->Zuul[Zuul Gateway]\nZuul-->BFF[Device API]\nBFF-->Microservices\nMicroservices-->Cassandra\nMicroservices-->EVCache\nS3[(S3 Master)]-->Encoding\nEncoding-->OpenConnect[(OCAs)]",
            metrics: { architecture: "Microservices", reliability: "Chaos Engineering" }
        }
    },
    "ride-share": {
        eli5: {
            overview: "This app works like a digital matchmaker for cars and riders.",
            points: [
                "**You (Rider)**: Open the app and broadcast 'I'm here'.",
                "**The Map**: Shows all cars wandering nearby.",
                "**The Matchmaker**: Finds the closest driver who isn't busy and introduces you."
            ],
            diagram: "graph TD\nRider-->App\nApp-->Matchmaker\nMatchmaker-->Driver\nDriver-->Map\nMap-->Rider",
            metrics: { realtime: "Yes", location: "GPS" }
        },
        intermediate: {
            overview: "A real-time location-based marketplace matching supply and demand.",
            points: [
                "**Geospatial Indexing**: World divided into cells (S2 Geometry) to query drivers.",
                "**Matching Service**: Algorithms optimize for lowest ETA and highest utilization.",
                "**State Management**: Driver state (Idle, EnRoute, OnTrip) is critical."
            ],
            diagram: "graph TD\nRider-->LB\nLB-->DispatchSvc\nDispatchSvc-->GeoIndex[(S2 Geo Index)]\nDispatchSvc-->DriverSvc\nDriverSvc-->DriverDB",
            metrics: { geospatial: "S2/H3", matching: "Greedy/Hungarian" }
        },
        senior: {
            overview: "Deep system design of a high-throughput dispatch system.",
            points: [
                "**Consistent Hashing**: DISCO service shards data across the cluster (Ringpop).",
                "**Microservices**: Moved from monolith to 4,000+ services for scale.",
                "**Schemaless Storage**: Custom sharded database setup for trip data."
            ],
            diagram: "graph TD\nApp-->Edge\nEdge-->DISCO[Dispatch]\nDISCO-->Ringpop\nRingpop-->GeoWorker\nGeoWorker-->KvStore\nDISCO-->SupplySvc\nSupplySvc-->DriverState",
            metrics: { partitioning: "Geohash", protocol: "TChannel/gRPC" }
        }
    },
    "team-chat": {
        eli5: {
            overview: "Imagine a never-ending group huddle where everyone can pass notes instantly.",
            points: [
                "**The Room (Channel)**: A space where a group of friends gathers.",
                "**The Runner (Socket)**: A super-fast messenger who runs back and forth.",
                "**The Notebook (History)**: Keeps a permanent record of all notes passed."
            ],
            diagram: "graph TD\nUser-->App\nApp-->Runner[WebSocket]\nRunner-->Room[Channel]\nRoom-->Others",
            metrics: { speed: "Instant", type: "Real-time" }
        },
        intermediate: {
            overview: "A persistent, real-time messaging platform using WebSockets.",
            points: [
                "**WebSocket Connection**: Keeps a pipe open for instant bi-directional data.",
                "**Pub/Sub System**: When you send a msg, it's 'published' to channel 'subscribers'.",
                "**Presence**: Detecting who is online/offline using heartbeats."
            ],
            diagram: "graph TD\nClient-->LB\nLB-->Gateway[WebSocket Gateway]\nGateway-->MsgHandler\nMsgHandler-->Redis[(Pub/Sub)]\nMsgHandler-->DB[(History)]",
            metrics: { protocol: "WSS", latency: "Low" }
        },
        senior: {
            overview: "Optimized for high-concurrency and message delivery guarantees.",
            points: [
                "**Edge Termination**: Termination of SSL/WSS at the edge (Cloudflare/AWS).",
                "**Optimization**: Protocol buffers for payload compression.",
                "**Distributed Cache**: Redis Cluster for presence and ephemeral state."
            ],
            diagram: "graph TD\nClient-->Edge\nEdge-->WSS_Server\nWSS_Server-->Kafka\nKafka-->PersistWorker\nKafka-->PushWorker\nPersistWorker-->ScyllaDB",
            metrics: { throughput: "High", protocol: "Protobuf" }
        }
    },
    "instant-messaging": {
        eli5: {
            overview: "This app is like passing sealed notes in class, ensuring only you and your friend can read them.",
            points: [
                "**Sealed Notes**: Messages are encrypted so only sender and receiver can read.",
                "**Teacher (Server)**: The server cannot open or read your notes."
            ],
            diagram: "graph TD\nYou-->Note[Sealed Note]\nNote-->Server\nServer-->Friend\nFriend-->Note",
            metrics: { security: "End-to-End Encrypted" }
        },
        intermediate: {
            overview: "Key Feature: End-to-End Encryption (E2EE) using the Signal Protocol.",
            points: [
                "**Store and Forward**: Messages are deleted from the server once delivered.",
                "**XMPP Protocol**: Uses a customized version of XMPP for low bandwidth communication."
            ],
            diagram: "graph TD\nUserA-->ErlangServer\nErlangServer-->UserB\nUserB-->Ack\nAck-->UserA",
            metrics: { protocol: "XMPP / MQTT" }
        },
        senior: {
            overview: "Erlang-based architecture designed for massive concurrency and privacy.",
            points: [
                "**Ejabberd**: Heavily modified XMPP server optimized for mobile devices.",
                "**Mnesia**: On-device database for storing messages (server stores nothing permanently).",
                "**Media Handling**: Uploaded to blob store, only encrypted link sent in message."
            ],
            diagram: "graph TD\nPhone-->LB\nLB-->ChatNode[Erlang Node]\nChatNode-->Mnesia\nChatNode-->PushNotif\nPhone-->BlobStore[Media Upload]",
            metrics: { language: "Erlang/Elixir", nodes: "Clustered" }
        }
    },
    "photo-sharing": {
        eli5: {
            overview: "A digital scrapbook that fits in your pocket.",
            points: [
                "**The Camera**: Snaps the memory.",
                "**The Filter**: Adds magic logic to make it look cool.",
                "**The Cloud**: Keeps the photo even if you lose your phone.",
                "**The Feed**: Shows your friends' scrapbooks."
            ],
            diagram: "graph TD\nCamera-->Filter\nFilter-->Upload\nUpload-->Cloud\nCloud-->Feed",
            metrics: { storage: "High", media: "Images" }
        },
        intermediate: {
            overview: "Image-heavy social platform focusing on media storage and retrieval.",
            points: [
                "**Blob Storage**: Storing binaries in S3/GCS, metadata in DB.",
                "**CDN Integration**: serving images from the edge.",
                "**Image Processing**: Generating thumbnails and different resolutions on upload."
            ],
            diagram: "graph TD\nApp-->API\nAPI-->MetadataDB\nAPI-->BlobStore\nBlobStore-->Worker\nWorker-->Thumbnails\nThumbnails-->CDN",
            metrics: { cdn: "Global", writes: "Async" }
        },
        senior: {
            overview: "Optimized for write-throughput and global media distribution.",
            points: [
                "**Haystack/F4**: Facebook's custom object storage for small immutable files.",
                "**Sharding Key**: UserID based sharding for locality.",
                "**Caching Strategy**: Multi-tier caching for hot content (viral photos)."
            ],
            diagram: "graph TD\nUpload-->WriteThrough\nWriteThrough-->HotStorage\nWriteThrough-->WarmStorage\nRead-->Cache\nCache-->HotStorage",
            metrics: { filesystem: "Custom", throughput: "Massive" }
        }
    },
    "video-platform": {
        eli5: {
            overview: "A library where anyone can put a book on the shelf.",
            points: [
                "**Upload**: You send a raw video to the system.",
                "**Processing**: Robots check it for bad words and copyright.",
                "**Streaming**: It plays instantly anywhere in the world."
            ],
            diagram: "graph TD\nCreator-->Upload\nUpload-->Robot[Check]\nRobot-->Public\nPublic-->Viewer",
            metrics: { storage: "Infinite" }
        },
        intermediate: {
            overview: "Handles massive storage and copyright detection for user-generated video.",
            points: [
                "**ContentID**: Automatic fingerprinting to detect copyrighted music/video.",
                "**Scalability**: Python frontend, C++ backend for performance.",
                "**Transcoding**: Converting uploaded video into various formats and resolutions."
            ],
            diagram: "graph TD\nUser-->GFE[Google Front End]\nGFE-->AppServer\nAppServer-->BigTable\nAppServer-->Vitess[MySQL Sharding]",
            metrics: { db: "BigTable / Vitess" }
        },
        senior: {
            overview: "Serving video at global scale with advanced encoding and storage.",
            points: [
                "**GSLB**: Global Server Load Balancing routes users to the nearest edge node.",
                "**Encoding**: Massive distributed encoding jobs (Borg) to create DASH manifests.",
                "**Storage**: Colossus (GFS successor) for blobs, BigTable for metadata."
            ],
            diagram: "graph TD\nClient-->Edge\nEdge-->GSLB\nEdge-->Borg[Encoding Cluster]\nBorg-->Colossus[File System]\nClient-->BigTable[Metadata]",
            metrics: { file_system: "Colossus", orchestration: "Borg" }
        }
    },
    "search-engine": {
        eli5: {
            overview: "A magical librarian that has read every book in the world.",
            points: [
                "**The Spider (Crawler)**: Visits every website and reads what's on it.",
                "**The Index**: A massive book listing where every word can be found.",
                "**The Ranker**: Decides which page is the 'best' answer for your question."
            ],
            diagram: "graph TD\nWeb-->Spider\nSpider-->Index\nUser-->Query\nQuery-->Ranker\nRanker-->Index\nIndex-->Result",
            metrics: { scale: "The Internet" }
        },
        intermediate: {
            overview: "Search Engine Architecture: Crawler, Indexer, Ranker.",
            points: [
                "**Crawler (Googlebot)**: Fetches pages with politeness policies.",
                "**Indexer**: Parses text, tokenizes, stores in BigTable.",
                "**PageRank**: Algorithm to determine importance based on backlinks."
            ],
            diagram: "graph TD\nURLServer-->Crawler\nCrawler-->Store\nStore-->Indexer\nIndexer-->Barrels\nSearcher-->Barrels\nUser-->Searcher",
            metrics: { algo: "PageRank" }
        },
        senior: {
            overview: "Massive distributed system processing the web graph.",
            points: [
                "**MapReduce**: Used to process the link graph and build the inverted index.",
                "**BigTable**: Structured storage for crawled data.",
                "**GFS**: Distributed file system for storing raw HTML."
            ],
            diagram: "graph TD\nWeb-->Crawler\nCrawler-->GFS\nGFS-->MapReduce\nMapReduce-->IndexBlocks\nUser-->GFE\nGFE-->IndexServers\nIndexServers-->DocServers",
            metrics: { batch_processing: "MapReduce", storage: "GFS/BigTable" }
        }
    },
    "cloud-storage": {
        eli5: {
            overview: "A magic folder that exists on all your computers at once.",
            points: [
                "**Block**: Files are cut into lego bricks.",
                "**Sync**: Only the changed bricks are sent over the internet.",
                "**Consistency**: If you save on your laptop, it shows up on your phone."
            ],
            diagram: "graph TD\nFile-->Blocks\nBlocks-->Cloud\nCloud-->Laptop\nCloud-->Phone",
            metrics: { sync: "Differential" }
        },
        intermediate: {
            overview: "File Synchronization System optimizing for bandwidth.",
            points: [
                "**Chunking**: Files split into 4MB chunks. SHA-256 hash identifies each chunk.",
                "**Deduplication**: If two users upload the same file, only one copy is stored.",
                "**Versioning**: Keeping history of file changes for restore."
            ],
            diagram: "graph TD\nClient-->BlockSvc\nClient-->MetaSvc\nBlockSvc-->S3\nMetaSvc-->MySQL\nClient-->NotifSvc\nNotifSvc-->LongPoll",
            metrics: { protocol: "Long Polling" }
        },
        senior: {
            overview: "Optimizing sync efficiency at scale.",
            points: [
                "**Magic Pocket**: Custom internal storage system (moved off S3).",
                "**Rust**: Rewrite of the sync engine (Nucleus) for performance and thread safety.",
                "**Delta Sync**: Only transmitting changed bytes within a block."
            ],
            diagram: "graph TD\nClient-->Nucleus\nNucleus-->Hash\nNucleus-->BlockServer\nBlockServer-->MagicPocket\nClient-->MetaServer\nMetaServer-->Edgestore",
            metrics: { storage: "Magic Pocket", language: "Rust" }
        }
    },
    "short-video": {
        eli5: {
            overview: "A TV that knows exactly what you want to watch next.",
            points: [
                "**Swipe**: Each swipe tells the brain 'I liked this' or 'I didn't'.",
                "**Feed**: The brain prepares the next video instantly.",
                "**Cache**: The video is downloaded before you even swipe."
            ],
            diagram: "graph TD\nSwipe-->Brain[AI]\nBrain-->NextVideo\nNextVideo-->Screen",
            metrics: { algo: "Recommendation" }
        },
        intermediate: {
            overview: "Low-latency personalized video feed.",
            points: [
                "**Recommendation Engine**: Real-time collaborative filtering based on watch time.",
                "**Pre-loading**: The next 3 videos are downloaded while you watch the current one.",
                "**Edge Caching**: Content is served from nearest PoP."
            ],
            diagram: "graph TD\nApp-->Edge\nEdge-->RecSys\nRecSys-->UserProfile\nRecSys-->VideoDB\nEdge-->CDN",
            metrics: { latency: "Zero-perceived" }
        },
        senior: {
            overview: "The Monolith of Algorithms processing signals in real-time.",
            points: [
                "**Real-time Feature Engineering**: User actions are fed instantly into the model.",
                "**Video Classification**: AI analyzes video content (Computer Vision) to tag it.",
                "**Global CDN**: Massive edge network to serve video from the closest point."
            ],
            diagram: "graph TD\nUpload-->CV_Analysis\nCV_Analysis-->Tags\nInteractions-->Kafka\nKafka-->Flink\nFlink-->Training\nTraining-->ModelServing\nApp-->ModelServing",
            metrics: { ml: "Real-time Training", pipeline: "Flink/Kafka" }
        }
    },
    "video-conferencing": {
        eli5: {
            overview: "Connects your camera to your friend's screen instantly.",
            points: [
                "**Video**: Your camera takes pictures very fast.",
                "**Compress**: The app squishes them to fit through the wire.",
                "**Display**: The other side unsquishes them."
            ],
            diagram: "graph TD\nMe-->Compress\nCompress-->Internet\nInternet-->Unsquish\nUnsquish-->You",
            metrics: { protocol: "UDP" }
        },
        intermediate: {
            overview: "Video Conferencing via WebRTC/Custom Protocol.",
            points: [
                "**Transport**: UDP is preferred over TCP to avoid head-of-line blocking (latency > quality).",
                "**SFU (Selective Forwarding Unit)**: Server routes video streams without decoding them.",
                "**Signaling**: WebSocket based setup for P2P connection."
            ],
            diagram: "graph TD\nClient-->SignalingServer\nClient-->MediaServer[SFU]\nMediaServer-->OtherClients",
            metrics: { codec: "H.264 / AV1" }
        },
        senior: {
            overview: "Handling 300ms latency globally with jitter management.",
            points: [
                "**Multimedia Router**: Distributed network of servers creating an overlay network.",
                "**Zone Controller**: Manages meetings in a geographic region.",
                "**QoS**: Adaptive handling of packet loss (FEC - Forward Error Correction)."
            ],
            diagram: "graph TD\nClient-->MMR[Multimedia Router]\nMMR-->ZoneController\nMMR-->GlobalBackbone\nMMR-->Client2\nClient-->HTTP[Web API]",
            metrics: { network: "Overlay Network", logic: "Distributed Control" }
        }
    },
    "e-commerce": {
        eli5: {
            overview: "Allows anyone to open a store.",
            points: [
                "**Storefront**: The pretty website customers see.",
                "**Inventory**: The back room counting how many items are left.",
                "**Checkout**: The cash register.",
                "**Shipping**: The robot packing the box."
            ],
            diagram: "graph TD\nCustomer-->Website\nWebsite-->Cart\nCart-->Payment\nPayment-->Shipping",
            metrics: { type: "E-commerce" }
        },
        intermediate: {
            overview: "Multi-tenant E-commerce Platform with isolation.",
            points: [
                "**Isolation**: Each shop is logically isolated but shares infrastructure (Podding architecture).",
                "**Flash Sales**: Scalable queues to handle Black Friday traffic spikes.",
                "**Job Queue**: Async processing for emails and reports."
            ],
            diagram: "graph TD\nUser-->LB\nLB-->RailsApp\nRailsApp-->MySQL[Sharded DB]\nRailsApp-->Redis[Job Queue]\nRailsApp-->Memcached",
            metrics: { architecture: "Podding" }
        },
        senior: {
            overview: "Pod Architecture for Horizontal Scalability.",
            points: [
                "**Pod**: A self-contained unit (Web Servers + Job Workers + DB + Cache) handling a specific set of shops.",
                "**Routing**: Nginx routes request to the correct pod based on shop ID.",
                "**Resilience**: If one pod fails, only those shops are affected."
            ],
            diagram: "graph TD\nRequest-->OpenResty\nOpenResty-->Pod1\nOpenResty-->Pod2\nPod1-->Rails\nPod1-->MySQL\nPod1-->Redis\nPod2-->Rails",
            metrics: { tenancy: "Sharded Pods", framework: "Ruby on Rails" }
        }
    },
    "payment-gateway": {
        eli5: {
            overview: "Moves money across the internet securely.",
            points: [
                "**Token**: Your credit card number is turned into a secret code.",
                "**Charge**: The code is sent to the bank.",
                "**Confirm**: The bank says 'Yes' or 'No'."
            ],
            diagram: "graph TD\nCard-->Token\nToken-->Stripe\nStripe-->Bank\nBank-->Success",
            metrics: { compliance: "PCI-DSS" }
        },
        intermediate: {
            overview: "Payment Gateway APIs ensuring accuracy.",
            points: [
                "**Idempotency**: Providing an `Idempotency-Key` ensures a charge isn't processed twice on retry.",
                "**Ledger**: Double-entry accounting system for absolute accuracy.",
                "**Tokenization**: Storing card numbers in a separate secure vault."
            ],
            diagram: "graph TD\nMerchant-->API\nAPI-->TokenVault\nAPI-->Ledger\nAPI-->BankNetwork\nBankNetwork-->Visa/Mastercard",
            metrics: { critical: "Accuracy" }
        },
        senior: {
            overview: "Financial Infrastructure reliability and compliance.",
            points: [
                "**Timeline**: A unified log of all state changes for reconciliation.",
                "**Ratchet**: Gradual rollout of API changes to prevent regressions.",
                "**Compliance**: Tokenization (PCI-DSS) separates sensitive data from business logic."
            ],
            diagram: "graph TD\nAPI-->Rocket[Request Coordinator]\nRocket-->StateDB\nStateDB-->Ledger\nRocket-->Gateways\nGateways-->CardNetworks",
            metrics: { availability: "99.999%", patterns: "Idempotency" }
        }
    },
    "url-shortener": {
        eli5: {
            overview: "Makes long internet addresses short.",
            points: [
                "**Long Link**: An address that's too long to remember.",
                "**Short Link**: A small tag like /abc.",
                "**Redirect**: When you visit /abc, it sends you to the long address."
            ],
            diagram: "graph TD\nLongURL-->Machine\nMachine-->ShortCode\nUser-->ShortCode\nShortCode-->LongURL",
            metrics: { function: "Mapping" }
        },
        intermediate: {
            overview: "URL Shortener Service functionality.",
            points: [
                "**Hashing**: Convert ID (12345) to Base62 (a-z, A-Z, 0-9) to get a short string.",
                "**Redirect**: Returns HTTP 301 (Permanent) or 302 (Temporary).",
                "**Analytics**: Tracking click-through rates on short links."
            ],
            diagram: "graph TD\nReq-->App\nApp-->Cache\nCache-->DB\nDB-->Base62\nBase62-->Redirect",
            metrics: { status: "301 Redirect" }
        },
        senior: {
            overview: "High-throughput ID generation strategies.",
            points: [
                "**KGS (Key Generation Service)**: Pre-generates keys and stores them in a DB to avoid collision checks on write.",
                "**Zookeeper**: Manages ranges of IDs for distributed servers to ensure uniqueness.",
                "**Caching**: Aggressive caching (LRU) for popular links."
            ],
            diagram: "graph TD\nClient-->WS[WebServer]\nWS-->KGS\nKGS-->ZK[Zookeeper]\nKGS-->PreGenKeys\nWS-->DB\nWS-->Cache",
            metrics: { throughput: "Write-Heavy", method: "KGS" }
        }
    },
    "package-manager": {
        eli5: {
            overview: "Imagine a robot librarian that runs to a huge warehouse.",
            points: [
                "**You**: Ask for a specific lego set (library).",
                "**The Robot (CLI)**: Runs to the warehouse (Registry).",
                "**The Warehouse**: Checks if they have it and gives the box to the robot.",
                "**Home**: The robot brings it back and puts it in your toy chest (node_modules)."
            ],
            diagram: "graph TD\nYou-->Command[Terminal]\nCommand-->Robot[npm CLI]\nRobot-->Warehouse[NPM Registry]\nWarehouse-->Box[Package]\nBox-->Chest[Your Computer]",
            metrics: { security: "Medium", speed: "Dependant on Wi-Fi" }
        },
        intermediate: {
            overview: "A package manager resolution process.",
            points: [
                "**Resolution**: Reads `package.json`, builds a dependency tree.",
                "**Fetching**: Downloads tarballs from the Registry (registry.npmjs.org).",
                "**Integrity**: Verifies shasum integrity hashes.",
                "**Linking**: Symlinks binaries to `.bin`."
            ],
            diagram: "graph TD\nCLI-->Resolver\nResolver-->Lockfile[package-lock.json]\nResolver-->Registry[HTTPS Registry]\nRegistry-->Tarball\nTarball-->Cache[Local Cache]\nCache-->Extractor\nExtractor-->Disk[node_modules]",
            metrics: { throughput: "High", iops: "Disk Intensive" }
        },
        senior: {
            overview: "Client-side interface for distributed registry system.",
            points: [
                "**Supply Chain**: Uses `integrity` hashes to prevent Man-in-the-Middle attacks.",
                "**Caching**: Aggressive local caching (`~/.npm`) to reduce network calls.",
                "**Scripts**: Life-cycle scripts (`preinstall`) are a major security vector (Arbitrary Code Execution).",
                "**Resolution**: Deterministic flattening algorithm to avoid 'Dependency Hell'."
            ],
            diagram: "graph TD\nShell-->Process[Node Process]\nProcess-->Config[Config Loader]\nConfig-->Arborist[Arborist (Tree Builder)]\nArborist-->Pacote[Pacote (Fetcher)]\nPacote-->RegistryAPI\nRegistryAPI-->CDN\nCDN-->Tarball\nArborist-->FS[File System Syscalls]",
            metrics: { security: "Critical Risk", complexity: "NP-Hard Resolution" }
        }
    },
    "version-control": {
        eli5: {
            overview: "A time machine for your files.",
            points: [
                "**Save Point**: You take a photo of your folder (Commit).",
                "**Time Travel**: You can go back to any photo whenever you want.",
                "**Parallel**: You and your friend can work on different copies and merge them later."
            ],
            diagram: "graph TD\nWork-->Save[Commit]\nSave-->History\nHistory-->BranchA\nHistory-->BranchB\nBranchA-->Merge\nBranchB-->Merge",
            metrics: { type: "Version Control" }
        },
        intermediate: {
            overview: "Distributed Version Control System (DVCS).",
            points: [
                "**DAG**: History is a Directed Acyclic Graph of commit objects.",
                "**SHA-1**: Content addressing. If a file changes, its hash changes, and the commit hash changes.",
                "**Staging**: The index area preparing the next commit."
            ],
            diagram: "graph TD\nWorkingDir-->Staging[Index]\nStaging-->Repository[.git]\nRepository-->Remote[GitHub]",
            metrics: { integrity: "SHA-1 / SHA-256" }
        },
        senior: {
            overview: "Internals of .git directory.",
            points: [
                "**Objects**: Blobs (file content), Trees (directory structure), Commits (metadata).",
                "**Refs**: Pointers to commits (heads/master).",
                "**Packfiles**: Delta compression to store differences efficiently.",
                "**Plumbing vs Porcelain**: Low-level vs High-level commands."
            ],
            diagram: "graph TD\nRef[HEAD]-->Commit\nCommit-->Tree\nTree-->Blob[File Content]\nTree-->SubTree\nBlob-->Zlib[Compressed Object]",
            metrics: { storage: "Delta Compression" }
        }
    },
    "container-orchestrator": {
        eli5: {
            overview: "A captain for a ship full of cargo containers.",
            points: [
                "**Container**: A box with your app inside.",
                "**Pod**: A small group of boxes.",
                "**Captain (K8s)**: Makes sure every box is safe, restarts them if they fall, and moves them to balance the ship."
            ],
            diagram: "graph TD\nCaptain-->Ship1\nCaptain-->Ship2\nShip1-->Box[App]\nShip2-->Box[App]\nBox-->Crash\nCaptain-->RestartBox",
            metrics: { scale: "Orchestration" }
        },
        intermediate: {
            overview: "Container Orchestration Platform.",
            points: [
                "**Desired State**: You tell the system 'I want 3 copies'. It runs a loop to ensure 3 copies exist.",
                "**Service Discovery**: DNS for internal communication (my-app.default.svc.cluster.local).",
                "**Ingress Control**: Managing external access to services."
            ],
            diagram: "graph TD\nUser-->API\nAPI-->Etcd[State Store]\nController-->API\nScheduler-->API\nKubelet-->Docker\nDocker-->Pod",
            metrics: { loop: "Reconciliation" }
        },
        senior: {
            overview: "The Control Plane Architecture.",
            points: [
                "**Etcd**: Consistent, distributed key-value store for cluster data (Raft consensus).",
                "**API Server**: The only component that talks to Etcd. All other components talk to API Server.",
                "**Kubelet**: Agent running on every node that ensures containers are running in a Pod."
            ],
            diagram: "graph TD\nUser-->APIServer\nAPIServer-->Etcd[Raft Store]\nControllerMgr-->APIServer\nScheduler-->APIServer\nAPIServer-->Kubelet[Node Agent]\nKubelet-->CRI[Container Runtime]\nKubelet-->CNI[Networking]",
            metrics: { consensus: "Raft", store: "Etcd" }
        }
    },
    "multimodal-ai": {
        eli5: {
            overview: "A super-smart digital brain that can read, see, and listen.",
            points: [
                "**Eyes & Ears**: It takes in text, images, and audio all at once.",
                "**The Brain**: A massive web of connections that understands patterns.",
                "**The Voice**: It gives you an answer in words, code, or even pictures."
            ],
            diagram: "graph TD\nYou-->Input[Text/Image/Audio]\nInput-->Encoder\nEncoder-->MultimodalModel[Gemini Pro]\nMultimodalModel-->Decoder\nDecoder-->Answer",
            metrics: { type: "Multimodal LLM", context: "1M+ Tokens" }
        },
        intermediate: {
            overview: "A natively multimodal mixture-of-experts (MoE) model.",
            points: [
                "**Transformer**: Based on the Transformer decoder architecture with improvements for stability at scale.",
                "**Multimodal**: Trained on interleaved text, image, and audio data from the start, not stitched together.",
                "**Routing**: Sparse MoE routing selects only a fraction of experts per token."
            ],
            diagram: "graph TD\nUser-->API\nAPI-->SafetyFilter\nSafetyFilter-->MoERouter\nMoERouter-->Expert1[Text]\nMoERouter-->Expert2[Code]\nMoERouter-->Expert3[Visual]\nExperts-->Aggregator\nAggregator-->TokenGen",
            metrics: { architecture: "MoE Transformer", training: "TPUv5e" }
        },
        senior: {
            overview: "Scalable training and inference infrastructure.",
            points: [
                "**Orchestration**: Pathways performs asynchronous dispatch of gang-scheduled tasks across thousands of TPU chips.",
                "**Context Window**: Ring Attention mechanism allows processing millions of tokens by distributing the sequence across memory.",
                "**Optimization**: Quantization and distillation for efficient serving."
            ],
            diagram: "graph TD\nClient-->GFE\nGFE-->InferenceServer\nInferenceServer-->KV_Cache\nInferenceServer-->TPU_Pod\nTPU_Pod-->HBM[High Bandwidth Memory]\nTPU_Pod-->ICI[Inter-Chip Interconnect]",
            metrics: { parallelism: "Model/Data/Pipeline", attention: "Ring Attention" }
        }
    },
    "code-assistant": {
        eli5: {
            overview: "A programmer that has read every coding book in the world.",
            points: [
                "**Read**: You write a comment like '// draw a circle'.",
                "**Think**: It remembers how other people drew circles.",
                "**Write**: It types the code for you instantly."
            ],
            diagram: "graph TD\nComment-->Codex\nCodex-->Memory[GitHub Code]\nCodex-->Suggestion\nSuggestion-->Editor",
            metrics: { usage: "GitHub Copilot", skill: "Coding" }
        },
        intermediate: {
            overview: "LLM specialized for code generation.",
            points: [
                "**Training**: Fine-tuned on public code repositories (GitHub).",
                "**Tokenizer**: Specialized tokenizer that preserves whitespace and handles coding syntax better than standard text models.",
                "**Context**: Using RAG to fetch relevant snippets from the workspace."
            ],
            diagram: "graph TD\nIDE-->Plugin\nPlugin-->Context[Cursor Position]\nContext-->API\nAPI-->CodexModel\nCodexModel-->Completion\nCompletion-->IDE",
            metrics: { latency: "Low", context: "File + Imports" }
        },
        senior: {
            overview: "Integration of LLM into developer workflows.",
            points: [
                "**FIM (Fill-In-the-Middle)**: Training objective that allows the model to look at both prefix and suffix of the cursor to generate code.",
                "**Telemetry**: Telemetry data improves model by learning from accepted/rejected suggestions.",
                "**Privacy**: PII redaction pipeline before sending code snippets to the server."
            ],
            diagram: "graph TD\nVSCode-->LSP[Language Server]\nLSP-->PromptEng\nPromptEng-->OpenAI_API\nOpenAI_API-->Batcher\nBatcher-->GPU_Cluster\nGPU_Cluster-->StreamResp",
            metrics: { objective: "FIM", sanitization: "PII Removal" }
        }
    },
    "music-generator": {
        eli5: {
            overview: "A piano teacher that composes new songs.",
            points: [
                "**Listen**: You play a few notes.",
                "**Dream**: It imagines how the rest of the song should go.",
                "**Play**: It finishes the melody for you."
            ],
            diagram: "graph TD\nNotes-->MiniMozart\nMiniMozart-->Patterns\nPatterns-->NewMelody\nNewMelody-->Speaker",
            metrics: { creative: "Music", input: "MIDI" }
        },
        intermediate: {
            overview: "Generative Music Transformer.",
            points: [
                "**MIDI Tokenization**: Music is converted into a sequence of discrete tokens (Pitch, Velocity, Duration).",
                "**Attention**: The model learns long-term musical structure (verse, chorus) using self-attention.",
                "**Inference**: Autoregressive generation of the next note."
            ],
            diagram: "graph TD\nMIDI-->Tokenizer\nTokenizer-->Transformer\nTransformer-->NextTokenPred\nNextTokenPred-->Detokenizer\nDetokenizer-->AudioSynth",
            metrics: { format: "Symbolic MIDI", model: "Transformer" }
        },
        senior: {
            overview: "Relative Attention for Musical Creativity.",
            points: [
                "**Relative Position**: Music depends on relative intervals, not absolute positions. Relative attention mechanisms capture this better.",
                "**Temperature**: Sampling with temperature controls the 'randomness' or 'creativity' of the output.",
                "**Hierarchical Modeling**: Handling multi-track consistency."
            ],
            diagram: "graph TD\nInputSeq-->Embedding\nEmbedding-->RelAttentionLayer\nRelAttentionLayer-->FeedForward\nFeedForward-->Softmax\nSoftmax-->Sampling[Top-k / Nucleus]\nSampling-->OutputNote",
            metrics: { sampling: "Nucleus (Top-p)", encoding: "REMI" }
        }
    },
    "digital-bank": {
        eli5: {
            overview: "A bank that lives in your phone without any building.",
            points: [
                "**The Card**: A bright coral card you use to buy things.",
                "**The App**: Shows you exactly what you spent instantly.",
                "**The Vault**: Keeps your money safe in the cloud."
            ],
            diagram: "graph TD\nCard-->Terminal\nTerminal-->MonzoCloud\nMonzoCloud-->PhoneBreakingNews\nPhoneBreakingNews-->You",
            metrics: { type: "Neobank", speed: "Instant" }
        },
        intermediate: {
            overview: "Cloud-Native Banking Ledger.",
            points: [
                "**Microservices**: 2,000+ Go microservices running on Kubernetes.",
                "**Event Sourcing**: Every transaction is an immutable event. Balance is calculated by replaying events.",
                "**Security**: Mutual TLS (mTLS) between all microservices."
            ],
            diagram: "graph TD\nApp-->API_Gateway\nAPI_Gateway-->ServiceMesh[Linkerd]\nServiceMesh-->TransactionSvc\nTransactionSvc-->Cassandra\nTransactionSvc-->Kafka",
            metrics: { language: "Go", db: "Cassandra" }
        },
        senior: {
            overview: "Building a bank on AWS.",
            points: [
                "**Consistency**: Uses Cassandra with Strong Consistency (Quorum) for the ledger.",
                "**Network**: Calico for network policy enforcement between microservices.",
                "**Platform**: Platform-as-a-Service internal tooling allows engineers to deploy services in minutes."
            ],
            diagram: "graph TD\nRequest-->Edge\nEdge-->Envoy\nEnvoy-->GoService\nGoService-->Etcd[Config]\nGoService-->RabbitMQ[Async]\nGoService-->Cassandra[(Ledger)]\nGoService-->Prometheus[Metrics]",
            metrics: { orchestration: "Kubernetes", consistency: "Strong (Quorum)" }
        }
    },
    "music-streaming": {
        eli5: {
            overview: "A jukebox that plays any song in the world instantly.",
            points: [
                "**The Library**: A massive hard drive with every song ever recorded.",
                "**The Cache**: Your phone saves songs you listen to often so they don't need to be downloaded again.",
                "**P2P (Legacy)**: Originally, users helped send songs to each other to make it faster."
            ],
            diagram: "graph TD\nServer-->YourPhone\nYourPhone-->Speaker\nCache-->Speaker\nServer-->Cache",
            metrics: { latency: "Low", type: "Streaming" }
        },
        intermediate: {
            overview: "Music Streaming with low perceived latency.",
            points: [
                "**Ogg Vorbis**: Efficient audio codec used for streaming.",
                "**Caching**: Aggressive caching on the client-side to reduce bandwidth costs.",
                "**Sharding**: User data is sharded across thousands of potential database instances."
            ],
            diagram: "graph TD\nApp-->LB\nLB-->AccessPoint\nAccessPoint-->PlaylistService\nAccessPoint-->SearchService\nAccessPoint-->Mercury[Messaging System]\nMercury-->Cassandra",
            metrics: { codec: "Ogg/AAC", protocol: "Mercury" }
        },
        senior: {
            overview: "Event-Driven Microservices Architecture.",
            points: [
                "**Mercury**: Custom internal protocol for communication between services.",
                "**Cassandra**: Heavily used for scalability and high availability of playlists/user data.",
                "**Paxos**: Used for consistency in critical systems."
            ],
            diagram: "graph TD\nClient-->Hermes[Gateway]\nHermes-->Keymaster[Auth]\nHermes-->MercuryRouter\nMercuryRouter-->PlaylistSvc\nMercuryRouter-->SearchSvc\nPlaylistSvc-->Bigtable\nSearchSvc-->Elasticsearch",
            metrics: { db: "Cassandra / Bigtable", messaging: "Mercury" }
        }
    },
    "vacation-rental": {
        eli5: {
            overview: "A travel agent that lets you stay in other people's houses.",
            points: [
                "**Search**: You look for a house in a city.",
                "**Book**: You ask the owner if you can stay.",
                "**Trust**: The system holds the money until you arrive to make sure it's safe."
            ],
            diagram: "graph TD\nGuest-->Search\nSearch-->House\nGuest-->Money\nMoney-->AirbnbSafe\nAirbnbSafe-->Host",
            metrics: { trust: "Escrow", type: "Marketplace" }
        },
        intermediate: {
            overview: "Two-sided Marketplace (Supply & Demand).",
            points: [
                "**Search**: Lucene-based search index for location and availability dates.",
                "**Pricing**: Dynamic pricing algorithms based on demand, seasonality, and local events.",
                "**Fraud Detection**: ML models scoring every transaction."
            ],
            diagram: "graph TD\nUser-->Nginx\nNginx-->Monorail[Ruby Monolith]\nMonorail-->MySQL\nMonorail-->Redis\nMonorail-->SearchService[Elasticsearch]",
            metrics: { framework: "Ruby on Rails", db: "MySQL" }
        },
        senior: {
            overview: "Migrating from Monolith to SOA (Service Oriented Architecture).",
            points: [
                "**Viaduct**: GraphQL-based data access layer that abstracts the mesh of microservices.",
                "**Availability**: Complex distributed locking to prevent double-booking of the same dates.",
                "**Spanner**: Moving critical transactional data to Google Spanner for global consistency."
            ],
            diagram: "graph TD\nClient-->API_Gateway\nAPI_Gateway-->Viaduct[GraphQL]\nViaduct-->HomesService\nViaduct-->PricingService\nViaduct-->AvailabilityService\nAvailabilityService-->Spanner\nHomesService-->DynamoDB",
            metrics: { architecture: "SOA / Viaduct", db: "Spanner" }
        }
    },
    "personal-agent": {
        eli5: {
            overview: "A super-smart robot butler that lives in your computer.",
            points: [
                "**Chat**: You can talk to it on WhatsApp or Discord.",
                "**Tools**: It can actually *do* things like searching the web or writing files.",
                "**Memory**: It remembers what you told it last week."
            ],
            diagram: "graph TD\nYou-->WhatsApp\nWhatsApp-->Clawdbot\nClawdbot-->Brain[AI Model]\nClawdbot-->Hands[Tools]\nHands-->Web\nHands-->Files",
            metrics: { type: "Personal Assistant", hands: "Yes" }
        },
        intermediate: {
            overview: "A local-first AI orchestration system.",
            points: [
                "**Gateway**: Routes messages from Discord/Slack to the core logic.",
                "**Memory**: Stores conversation history in local Markdown/JSONL files for privacy and auditability.",
                "**Tools**: Can execute terminal commands and scripts."
            ],
            diagram: "graph TD\nUser-->Gateway[Message Gateway]\nGateway-->Router\nRouter-->Planner[AI Planner]\nPlanner-->Executor\nExecutor-->LLM[Claude/Gemini]\nExecutor-->FileSystem\nExecutor-->Browser",
            metrics: { architecture: "Local-First", privacy: "High" }
        },
        senior: {
            overview: "An autonomous agent architecture emphasizing Reliability and Auditability.",
            points: [
                "**Planner-Executor Pattern**: Decouples reasoning (planning steps) from action (execution), allowing for verification and retry logic.",
                "**Evidence-First Logging**: Every tool output is persisted before the next step is generated, ensuring a deterministic audit trail.",
                "**State Management**: Uses a file-system based 'Journal' rather than just a vector DB."
            ],
            diagram: "graph TD\nIngress-->SessionMgr\nSessionMgr-->ContextBuilder\nContextBuilder-->Journal[(Markdown Files)]\nSessionMgr-->Planner\nPlanner-->StepQueue\nStepQueue-->Executor\nExecutor-->ToolRuntime\nToolRuntime-->SandboxedEnv",
            metrics: { pattern: "Planner-Executor", storage: "Journaling" }
        }
    }
};

export const SYSTEM_ICONS: Record<string, any> = {
    'video-streaming': Film,
    'music-streaming': Music,
    'ride-share': Car,
    'vacation-rental': Home,
    'instant-messaging': MessageCircle,
    'photo-sharing': Camera,
    'short-video': Video,
    'team-chat': Hash,
    'multimodal-ai': Brain,
    'personal-agent': Bot,
    'code-assistant': Code,
    'music-generator': Music,
    'digital-bank': CreditCard,
    'micro-blogging': Twitter,
    'video-platform': Youtube,
    'search-engine': Search,
    'cloud-storage': HardDrive,
    'video-conferencing': Video,
    'e-commerce': ShoppingBag,
    'payment-gateway': CreditCard,
    'url-shortener': Link,
    'package-manager': Package,
    'version-control': GitBranch,
    'container-orchestrator': ShipWheel,
    'default': Globe
};
