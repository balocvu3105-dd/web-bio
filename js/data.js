// ── WUTHERING WAVES DATABASE (RESONATORS, WEAPONS, ECHOES, SONATAS) ──

const WUWA_DATA = {
    resonators: [
        // 5★ Resonators
        {
            id: 'jinhsi', name: 'Jinhsi', rarity: 5, element: 'Spectro', weapon: 'Broadblade', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Lệnh doãn Châu Long của Hoàng Long. Sở hữu khả năng giao tiếp với Thần Long Jué, cô là người bảo vệ uy nghiêm và tận tụy của Jinzhou.',
            stats: { hp: '10,824', atk: '438', def: '1,162', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Incarnate (Forte Circuit)', desc: 'Tích lũy Incandescence từ đồng đội. Khi đầy, tiến vào trạng thái Incarnate tung ra đòn sát thương Spectro hủy diệt.' },
                { name: 'Solar Flare (Resonance Liberation)', desc: 'Triệu hồi sức mạnh Thần Long giáng đòn trừng phạt Spectro sát thương diện rộng.' }
            ]
        },
        {
            id: 'changli', name: 'Changli', rarity: 5, element: 'Fusion', weapon: 'Sword', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Cố vấn của Jinzhou và là sư phụ của Jinhsi. Một quân sư tài ba với ngọn lửa bất diệt có thể thiêu rụi mọi kẻ thù.',
            stats: { hp: '10,500', atk: '450', def: '1,100', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Flaming Sacrifice (Forte Circuit)', desc: 'Tích lũy Enflamement qua các đòn đánh, tung ra đòn trọng kích True Damage hệ Fusion cực mạnh.' },
                { name: 'Radiance of Feathers (Resonance Liberation)', desc: 'Tung cánh phượng hoàng thiêu đốt toàn bộ chiến trường, nhận ngay 4 tầng Enflamement.' }
            ]
        },
        {
            id: 'shorekeeper', name: 'Shorekeeper', rarity: 5, element: 'Spectro', weapon: 'Rectifier', role: 'Support / Healer',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Người bảo hộ bí ẩn của Black Shores. Cô quản lý dòng chảy dữ liệu của thế giới và hỗ trợ tối đa cho các Resonator.',
            stats: { hp: '12,500', atk: '380', def: '1,250', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Astral Network (Forte Circuit)', desc: 'Tạo vùng không gian đặc biệt, liên tục hồi phục HP và tăng mạnh tỷ lệ Bạo kích / Sát thương Bạo kích cho toàn đội.' },
                { name: 'Endless Horizons (Resonance Liberation)', desc: 'Triệu hồi bãi biển sao trời, cường hóa hiệu ứng vùng không gian lên mức tối đa.' }
            ]
        },
        {
            id: 'camellya', name: 'Camellya', rarity: 5, element: 'Havoc', weapon: 'Sword', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Thành viên cốt cán của Black Shores với phong cách chiến đấu điên cuồng, sử dụng dây leo Havoc cuốn trôi mọi mục tiêu.',
            stats: { hp: '10,650', atk: '465', def: '1,080', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Crimson Blossom (Forte Circuit)', desc: 'Chuyển đổi giữa trạng thái cận chiến và dây leo, gây sát thương Havoc liên tục với tốc độ cao.' },
                { name: 'Bloom of Death (Resonance Liberation)', desc: 'Nở rộ đóa hoa tử thần cuốn phăng toàn bộ kẻ thù trong phạm vi rộng lớn.' }
            ]
        },
        {
            id: 'xiangli_yao', name: 'Xiangli Yao', rarity: 5, element: 'Electro', weapon: 'Gauntlets', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Trưởng bộ phận nghiên cứu của Học Viện Huaxu. Một thiên tài khoa học sử dụng cánh tay cơ khí tích hợp năng lượng Electro.',
            stats: { hp: '10,400', atk: '460', def: '1,120', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Hypercube (Forte Circuit)', desc: 'Tích lũy Capacity từ các kỹ năng, kích hoạt đòn đánh cơ khí tốc độ cao với lượng sát thương Electro vượt trội.' },
                { name: 'Law of Cogitation (Resonance Liberation)', desc: 'Tiến vào trạng thái Intuitive, thay đổi bộ kỹ năng thành các đòn tấn công hủy diệt diện rộng.' }
            ]
        },
        {
            id: 'zhezhi', name: 'Zhezhi', rarity: 5, element: 'Glacio', weapon: 'Rectifier', role: 'Sub DPS / Support',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Họa sĩ tài năng nhưng nhút nhát. Cô sử dụng bút cọ để vẽ nên các thực thể Glacio hỗ trợ đồng đội và gây sát thương ngoài sân.',
            stats: { hp: '10,900', atk: '420', def: '1,180', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Painted Realm (Forte Circuit)', desc: 'Triệu hồi các bức tranh phantoms, khi tiêu biến sẽ gây sát thương Glacio đồng thời hồi năng lượng cho đội.' },
                { name: 'Living Canvas (Resonance Liberation)', desc: 'Tạo cọ vẽ bay lượn tấn công kẻ địch cùng lúc với nhân vật đang đứng sân.' }
            ]
        },
        {
            id: 'yinlin', name: 'Yinlin', rarity: 5, element: 'Electro', weapon: 'Rectifier', role: 'Sub DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Cựu thanh tra của Jinzhou, nay hoạt động bí mật. Sử dụng con rối Zapstring để giật sét và khắc dấu ấn trừng phạt lên kẻ thù.',
            stats: { hp: '10,300', atk: '445', def: '1,150', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Chameleon Mark (Forte Circuit)', desc: 'Gắn dấu ấn Sinner Mark lên kẻ địch, khi bị tấn công sẽ phát nổ sát thương Electro ngoài sân.' },
                { name: 'Thundering Wrath (Resonance Liberation)', desc: 'Triệu hồi Zapstring giáng sấm sét hủy diệt trên diện rộng.' }
            ]
        },
        {
            id: 'jiyan', name: 'Jiyan', rarity: 5, element: 'Aero', weapon: 'Broadblade', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Tướng quân của Dạ Quy Quân (Midnight Rangers). Người lãnh đạo kiên cường triệu hồi Thanh Long càn quét chiến trường.',
            stats: { hp: '10,800', atk: '455', def: '1,140', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Qingloong Avatar (Forte Circuit)', desc: 'Tăng cường sức mạnh các đòn đánh nặng khi thanh Resolve được tích đầy.' },
                { name: 'Emerald Storm (Resonance Liberation)', desc: 'Triệu hồi ngọn giáo Thanh Long, chuyển toàn bộ đòn đánh thành sát thương trọng kích Aero diện rộng.' }
            ]
        },
        {
            id: 'carlotta', name: 'Carlotta', rarity: 5, element: 'Glacio', weapon: 'Pistols', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Tay súng thiện xạ với phong cách chiến đấu nghệ thuật, kết hợp băng giá và những nhịp điệu chết chóc.',
            stats: { hp: '10,200', atk: '470', def: '1,090', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Deadly Rhythm (Forte Circuit)', desc: 'Tích lũy nhịp điệu khi bắn trúng đích, tung đòn bắn tỉa Glacio sát thương cực lớn.' },
                { name: 'Frostbite Waltz (Resonance Liberation)', desc: 'Tạo vùng bão tuyết và bắn liên hoàn vào các mục tiêu bị đóng băng.' }
            ]
        },
        {
            id: 'cartethyia', name: 'Cartethyia', rarity: 5, element: 'Aero', weapon: 'Sword', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Nữ chiến binh thần thoại với luồng gió uyển chuyển, biểu tượng của sự tự do và sức mạnh không giới hạn.',
            stats: { hp: '11,000', atk: '460', def: '1,150', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Windblade Dance (Forte Circuit)', desc: 'Tạo các luồng xoáy Aero xé rách giáp kẻ thù.' },
                { name: 'Tempest Domain (Resonance Liberation)', desc: 'Giải phóng cơn bão vĩnh cửu bao phủ toàn bộ chiến trường.' }
            ]
        },
        {
            id: 'aemeath', name: 'Aemeath', rarity: 5, element: 'Fusion', weapon: 'Broadblade', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Sứ giả của ngọn lửa vĩnh hằng, mang đến sự rực rỡ và sức mạnh bùng nổ trong từng nhát chém.',
            stats: { hp: '11,200', atk: '450', def: '1,180', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Solar Cleave (Forte Circuit)', desc: 'Tích tụ nhiệt lượng vào kiếm, chém ra ngọn lửa thiêu đốt diện rộng.' },
                { name: 'Supernova (Resonance Liberation)', desc: 'Gây vụ nổ Fusion khủng khiếp, làm choáng toàn bộ kẻ thù xung quanh.' }
            ]
        },
        {
            id: 'hiyuki', name: 'Hiyuki', rarity: 5, element: 'Glacio', weapon: 'Rectifier', role: 'Support / Healer',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Tiểu thư của tuyết trắng, sở hữu khả năng đóng băng thời gian và chữa lành vết thương cho đồng đội.',
            stats: { hp: '12,800', atk: '390', def: '1,220', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Crystalline Blessing (Forte Circuit)', desc: 'Tạo giáp băng bảo vệ đồng đội và phản sát thương lại kẻ tấn công.' },
                { name: 'Eternal Winter (Resonance Liberation)', desc: 'Đóng băng toàn bộ kẻ địch và hồi phục lượng lớn HP cho cả đội.' }
            ]
        },
        {
            id: 'phrolova', name: 'Phrolova', rarity: 5, element: 'Havoc', weapon: 'Rectifier', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Nghệ sĩ đàn hạc của bóng tối, điều khiển sóng âm Havoc để thao túng và hủy diệt tâm trí kẻ thù.',
            stats: { hp: '10,500', atk: '468', def: '1,110', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Abyssal Chords (Forte Circuit)', desc: 'Gảy đàn tạo sóng âm sát thương liên hoàn.' },
                { name: 'Requiem of Shadows (Resonance Liberation)', desc: 'Khúc ca tử thần làm suy yếu kháng Havoc của địch và gây sát thương chí mạng.' }
            ]
        },
        {
            id: 'calcharo', name: 'Calcharo', rarity: 5, element: 'Electro', weapon: 'Broadblade', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Thủ lĩnh lính đánh thuê Ghost Hounds. Tàn nhẫn và quyết đoán, đòn tấn công của anh tích tụ sấm sét cuồng nộ.',
            stats: { hp: '10,600', atk: '440', def: '1,150', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Mercy (Forte Circuit)', desc: 'Tích lũy Cruelty từ kỹ năng, tung ra đòn chém sấm sét Death Messenger sát thương cực mạnh.' },
                { name: 'Phantom Illusion (Resonance Liberation)', desc: 'Tiến vào trạng thái Deathbound, triệu hồi ảo ảnh Electro tấn công song hành.' }
            ]
        },
        {
            id: 'verina', name: 'Verina', rarity: 5, element: 'Spectro', weapon: 'Rectifier', role: 'Healer / Support',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Nhà thực vật học trẻ tuổi từ Liên Bang New Federation. Sử dụng sức mạnh của thực vật và ánh sáng để bảo vệ mọi người.',
            stats: { hp: '11,500', atk: '410', def: '1,200', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Starflower Blooms (Forte Circuit)', desc: 'Tích lũy Photosynthetic Energy để hồi phục HP cho toàn đội và tăng 20% toàn bộ sát thương.' },
                { name: 'Arboreal Flourish (Resonance Liberation)', desc: 'Tạo vùng cây cỏ nuôi dưỡng, đánh dấu kẻ địch để đồng đội tấn công nhận thêm hồi máu.' }
            ]
        },
        {
            id: 'encore', name: 'Encore', rarity: 5, element: 'Fusion', weapon: 'Rectifier', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Cô bé đáng yêu của Black Shores cùng hai người bạn thú bông Wooly và Cosmos, sở hữu sức mạnh hủy diệt rực lửa.',
            stats: { hp: '10,100', atk: '455', def: '1,080', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Mayhem (Forte Circuit)', desc: 'Khi Dissonance đầy, tích tụ và nổ tung lượng lớn sát thương Fusion.' },
                { name: 'Cosmos Rave (Resonance Liberation)', desc: 'Cosmos tiếp quản chiến đấu, chuyển hóa đòn đánh thường thành sát thương cận chiến bùng nổ.' }
            ]
        },
        {
            id: 'lingyang', name: 'Lingyang', rarity: 5, element: 'Glacio', weapon: 'Gauntlets', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Thành viên đoàn múa lân Su\'lahe. Anh mang dòng máu thần thú với khả năng chiến đấu trên không trung linh hoạt.',
            stats: { hp: '10,700', atk: '430', def: '1,160', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Striding Lion (Forte Circuit)', desc: 'Tiến vào trạng thái múa lân trên không, tấn công liên tục với tốc độ vượt trội.' },
                { name: 'Lion\'s Vigor (Resonance Liberation)', desc: 'Hóa thân thần thú, tăng mạnh sát thương Glacio và khả năng kháng gián đoạn.' }
            ]
        },
        {
            id: 'jianxin', name: 'Jianxin', rarity: 5, element: 'Aero', weapon: 'Gauntlets', role: 'Support / Sub DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Đạo sĩ Đạo Quán Phong Nghi, truyền nhân của môn võ Thái Cực. Cô sử dụng khí công để gom giặc, tạo giáp và hồi máu.',
            stats: { hp: '11,200', atk: '415', def: '1,210', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Primordial Chi (Forte Circuit)', desc: 'Vận khí công gom kẻ địch, khi hoàn tất tạo lớp giáp cực dày và hồi HP cho đồng đội kế tiếp.' },
                { name: 'Purifying Force (Resonance Liberation)', desc: 'Tạo lốc xoáy Aero khổng lồ hút và gây sát thương liên tục lên toàn bộ mục tiêu.' }
            ]
        },

        // 4★ Resonators
        {
            id: 'rover_havoc', name: 'Rover (Havoc)', rarity: 5, element: 'Havoc', weapon: 'Sword', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Người thức tỉnh mang trong mình bí ẩn của thế giới, thức tỉnh sức mạnh Havoc hủy diệt với lưỡi hái bóng tối.',
            stats: { hp: '10,800', atk: '445', def: '1,150', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Umbral Shroud (Forte Circuit)', desc: 'Khi đầy năng lượng, chuyển hóa vũ khí thành Lưỡi Hái, chém ra các đường kiếm Havoc chết chóc.' },
                { name: 'Deadweight (Resonance Liberation)', desc: 'Tụ tập bóng tối thành đòn chém duy nhất gây sát thương Havoc cực lớn.' }
            ]
        },
        {
            id: 'rover_spectro', name: 'Rover (Spectro)', rarity: 5, element: 'Spectro', weapon: 'Sword', role: 'Sub DPS / Support',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Trạng thái ban đầu của Rover upon awakening, sử dụng âm thanh và ánh sáng Spectro để chiến đấu và làm chậm thời gian.',
            stats: { hp: '10,800', atk: '430', def: '1,150', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'World in a Grain (Forte Circuit)', desc: 'Tạo vùng trễ thời gian làm chậm đòn tấn công của kẻ thù và gây sát thương Spectro.' },
                { name: 'Echoing Orchestra (Resonance Liberation)', desc: 'Giải phóng sóng âm chấn động cắt xẻ toàn bộ khu vực phía trước.' }
            ]
        },
        {
            id: 'sanhua', name: 'Sanhua', rarity: 4, element: 'Glacio', weapon: 'Sword', role: 'Sub DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Cận vệ trung thành của Jinhsi. Sở hữu đôi mắt bất thường có thể nhìn thấy độ ẩm trong không khí và ngưng tụ thành băng.',
            stats: { hp: '9,800', atk: '410', def: '1,050', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Clarity of Ice (Forte Circuit)', desc: 'Canh nhịp đòn trọng kích để kích nổ toàn bộ các tường băng Glacio trên chiến trường.' },
                { name: 'Glacial Gaze (Resonance Liberation)', desc: 'Tạo ra một dòng sông băng sát thương cực nhanh và để lại tường băng lớn.' }
            ]
        },
        {
            id: 'baizhi', name: 'Baizhi', rarity: 4, element: 'Glacio', weapon: 'Rectifier', role: 'Healer / Support',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Nhà nghiên cứu của Huaxu Academy cùng sinh vật Remnant tên You\'an. Cô chữa lành vết thương và gia tăng sức mạnh cho đội.',
            stats: { hp: '11,200', atk: '360', def: '1,150', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Cycle of Life (Forte Circuit)', desc: 'Tích lũy Concentration để hồi HP cho đồng đội có lượng máu thấp nhất và tạo buff tăng sát thương.' },
                { name: 'Momentary Union (Resonance Liberation)', desc: 'Triệu hồi You\'an hồi máu liên tục theo thời gian cho toàn bộ đội hình.' }
            ]
        },
        {
            id: 'mortefi', name: 'Mortefi', rarity: 4, element: 'Fusion', weapon: 'Pistols', role: 'Sub DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Thành viên quý tộc kiêm nhà khoa học tính tình nóng nảy. Anh hỗ trợ đồng đội bằng những cơn mưa rồng lửa ngoài sân.',
            stats: { hp: '9,900', atk: '420', def: '1,060', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Fury\'s Claws (Forte Circuit)', desc: 'Khi Annoyance đầy, tung đòn bắn rồng lửa sát thương diện rộng cực mạnh.' },
                { name: 'Violent Finale (Resonance Liberation)', desc: 'Kích hoạt trạng thái Burning Rhapsody, bắn ra các tia lửa hỗ trợ đòn đánh trọng kích của đồng đội.' }
            ]
        },
        {
            id: 'danjin', name: 'Danjin', rarity: 4, element: 'Havoc', weapon: 'Sword', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Thiếu nữ kiếm khách trẻ tuổi hành hiệp trượng nghĩa. Cô thi triển kiếm pháp hy sinh HP bản thân để đổi lấy sát thương tột đỉnh.',
            stats: { hp: '10,500', atk: '435', def: '1,100', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Serene Sacrifice (Forte Circuit)', desc: 'Tiêu hao HP để tung các chuỗi kiếm pháp Havoc liên hoàn, tích tụ Ruby Blossom hồi lại HP khi bùng nổ.' },
                { name: 'Crimson Bloom (Resonance Liberation)', desc: 'Chém liên tục vào mục tiêu với song kiếm nhuốm máu, gây sát thương Havoc diện rộng.' }
            ]
        },
        {
            id: 'chixia', name: 'Chixia', rarity: 4, element: 'Fusion', weapon: 'Pistols', role: 'Main DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Thanh tra trẻ tuổi đầy nhiệt huyết của Jinzhou. Cô luôn sẵn sàng xông pha với bộ đôi súng lục rực lửa.',
            stats: { hp: '9,700', atk: '425', def: '1,040', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Heroic Bullets (Forte Circuit)', desc: 'Tích lũy Thermic Bullets để xả súng liên thanh vào mục tiêu, kết thúc bằng cú bắn Boom Boom cực mạnh.' },
                { name: 'Blazing Flames (Resonance Liberation)', desc: 'Bắn ra vô số đạn lửa thiêu đốt toàn bộ kẻ địch xung quanh.' }
            ]
        },
        {
            id: 'taoqi', name: 'Taoqi', rarity: 4, element: 'Havoc', weapon: 'Broadblade', role: 'Support / Sub DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Giám đốc Bộ phận Quốc phòng Jinzhou. Dù luôn có vẻ lười biếng nhưng cô sở hữu chiếc khiên vững chãi nhất bảo vệ thành phố.',
            stats: { hp: '11,800', atk: '370', def: '1,300', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Rock Solid (Forte Circuit)', desc: 'Tạo lá chắn Rocksteady Shield giảm sát thương nhận vào và tăng sát thương kỹ năng Resonance cho đồng đội kế tiếp.' },
                { name: 'Unmovable (Resonance Liberation)', desc: 'Vung đại kiếm tạo vùng phòng thủ kiên cố, gây sát thương Havoc dựa trên chỉ số Phòng thủ.' }
            ]
        },
        {
            id: 'yangyang', name: 'Yangyang', rarity: 4, element: 'Aero', weapon: 'Sword', role: 'Support / Sub DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Outrider dịu dàng của Midnight Rangers. Cô lắng nghe luồng gió để gom kẻ địch và hỗ trợ hồi phục năng lượng cho đồng đội.',
            stats: { hp: '10,100', atk: '390', def: '1,120', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Echoing Feathers (Forte Circuit)', desc: 'Tích lũy Feather để tung đòn kiếm gió gom nhẹ kẻ thù, hồi phục Năng lượng Cộng hưởng cho đồng đội tiếp theo.' },
                { name: 'Windy Vortex (Resonance Liberation)', desc: 'Tạo lốc xoáy Aero cuốn và hất tung mục tiêu lên không trung.' }
            ]
        },
        {
            id: 'aalto', name: 'Aalto', rarity: 4, element: 'Aero', weapon: 'Pistols', role: 'Sub DPS / Support',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Người môi giới thông tin bí ẩn của Black Shores. Anh thi triển các màn sương mù ảo ảnh để lừa địch và tăng tốc đạn cho đồng đội.',
            stats: { hp: '9,950', atk: '405', def: '1,080', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Misty Mirage (Forte Circuit)', desc: 'Tạo ra các cánh cổng sương mù, đạn bắn qua cổng sẽ được tăng mạnh sát thương Aero.' },
                { name: 'Vortex of Illusions (Resonance Liberation)', desc: 'Triệu hồi trường ảo ảnh khổng lồ khiêu khích kẻ địch và cường hóa sát thương Aero cho toàn đội.' }
            ]
        },
        {
            id: 'yuanwu', name: 'Yuanwu', rarity: 4, element: 'Electro', weapon: 'Gauntlets', role: 'Sub DPS / Support',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Chủ quán trà võ sư điềm đạm. Anh sử dụng Lôi Trụ để gây sát thương phối hợp và phá giáp rung chấn (Stance) cực nhanh.',
            stats: { hp: '10,900', atk: '380', def: '1,250', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Thunder Wedge (Forte Circuit)', desc: 'Cắm Lôi Trụ xuống đất, liên tục giật sét tấn công cùng đồng đội và tăng tốc độ phá thanh rung chấn.' },
                { name: 'Lightning Mastery (Resonance Liberation)', desc: 'Tích tụ sấm sét vào nắm đấm, truyền trạng thái cường hóa khả năng kháng gián đoạn cho cả đội.' }
            ]
        },
        {
            id: 'lumi', name: 'Lumi', rarity: 4, element: 'Electro', weapon: 'Broadblade', role: 'Main DPS / Sub DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Cô bé người vận chuyển năng nổ từ Lomei Logistics, sử dụng đại kiếm phát sáng để dọn dẹp chướng ngại vật trên đường.',
            stats: { hp: '10,200', atk: '415', def: '1,100', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Sparkling Express (Forte Circuit)', desc: 'Tích tụ năng lượng tia lửa, tung đòn quét đại kiếm tốc độ cao.' },
                { name: 'Lightning Delivery (Resonance Liberation)', desc: 'Triệu hồi tia sét khổng lồ giáng xuống từ trên không, gây sát thương Electro diện rộng.' }
            ]
        },
        {
            id: 'youhu', name: 'Youhu', rarity: 4, element: 'Glacio', weapon: 'Gauntlets', role: 'Healer / Sub DPS',
            avatar: 'assets/icons/cartethyia-avatar.jpg',
            desc: 'Bé gái thần đồng thẩm định cổ vật của Jinzhou. Sử dụng các món đồ cổ kỳ lạ để tấn công và ngẫu nhiên mang lại buff cho đội.',
            stats: { hp: '11,000', atk: '375', def: '1,180', critRate: '5.0%', critDMG: '150.0%' },
            skills: [
                { name: 'Antique Appraisal (Forte Circuit)', desc: 'Rút ngẫu nhiên các món đồ cổ từ túi, mỗi món mang lại hiệu ứng hồi máu hoặc sát thương khác nhau.' },
                { name: 'Treasure Unleashed (Resonance Liberation)', desc: 'Ném ra toàn bộ sưu tập đồ cổ, tạo vụ nổ Glacio rực rỡ và hồi đầy HP cho đồng đội.' }
            ]
        }
    ],

    weapons: [
        // 5★ Weapons
        {
            id: 'ages_of_harvest', name: 'Ages of Harvest', type: 'Broadblade', rarity: 5, atk: '587', subStat: 'Crit Rate 24.3%',
            effect: 'Blessing of the Harvest',
            desc: 'Tăng 12% thuộc tính tất cả nguyên tố. Khi dùng Kỹ năng Cộng hưởng, nhận 24% Sát thương kỹ năng cộng hưởng trong 12s.'
        },
        {
            id: 'blazing_brilliance', name: 'Blazing Brilliance', type: 'Sword', rarity: 5, atk: '587', subStat: 'Crit DMG 48.6%',
            effect: 'Searing Plume',
            desc: 'Tăng 12% Tấn công. Khi gây sát thương, tích lũy tầng buff tăng Sát thương kỹ năng Cộng hưởng lên đến 56%.'
        },
        {
            id: 'stringmaster', name: 'Stringmaster', type: 'Rectifier', rarity: 5, atk: '500', subStat: 'Crit Rate 36.0%',
            effect: 'Electric Illusion',
            desc: 'Tăng 12% Tỷ lệ Bạo kích. Khi dùng Kỹ năng Cộng hưởng hoặc gây sát thương ngoài sân, tăng 12% Tấn công cho toàn đội.'
        },
        {
            id: 'verdant_summit', name: 'Verdant Summit', type: 'Broadblade', rarity: 5, atk: '587', subStat: 'Crit DMG 48.6%',
            effect: 'Sworn Gale',
            desc: 'Tăng 12% sát thương thuộc tính. Khi dùng Kỹ năng Giới hạn hoặc Intro, tăng 24% Sát thương Trọng kích trong 14s.'
        },
        {
            id: 'emerald_of_genesis', name: 'Emerald of Genesis', type: 'Sword', rarity: 5, atk: '587', subStat: 'Crit Rate 24.3%',
            effect: 'Pure Resolve',
            desc: 'Tăng 12% Hiệu suất Nạp năng lượng. Khi dùng Kỹ năng Cộng hưởng, tăng 6% Tấn công (tối đa 2 tầng).'
        },
        {
            id: 'static_mist', name: 'Static Mist', type: 'Pistols', rarity: 5, atk: '587', subStat: 'Crit Rate 24.3%',
            effect: 'Stormy Haze',
            desc: 'Tăng 12% Hiệu suất Nạp. Khi sử dụng Outro Skill, nhân vật tiếp theo vào sân được tăng 10% Tấn công trong 14s.'
        },
        {
            id: 'lustrous_razor', name: 'Lustrous Razor', type: 'Broadblade', rarity: 5, atk: '587', subStat: 'ATK 36.4%',
            effect: 'Stormy Flash',
            desc: 'Tăng 12% Hiệu suất Nạp. Khi dùng Kỹ năng Cộng hưởng, tăng 7% Sát thương Kỹ năng Giới hạn (tối đa 3 tầng).'
        },
        {
            id: 'abyss_surges', name: 'Abyss Surges', type: 'Gauntlets', rarity: 5, atk: '587', subStat: 'ATK 36.4%',
            effect: 'Tidal Calm',
            desc: 'Tăng 12% Hiệu suất Nạp. Khi đánh trúng địch bằng Kỹ năng Cộng hưởng, tăng 10% Tấn công trong 8s.'
        },
        {
            id: 'cosmic_ripples', name: 'Cosmic Ripples', type: 'Rectifier', rarity: 5, atk: '500', subStat: 'ATK 54.0%',
            effect: 'Stormy Waves',
            desc: 'Tăng 12% Hiệu suất Nạp. Khi đánh trúng bằng đòn đánh thường, tăng 3.2% Sát thương đánh thường (tối đa 5 tầng).'
        },

        // 4★ Weapons
        {
            id: 'helios_cleaver', name: 'Helios Cleaver', type: 'Broadblade', rarity: 4, atk: '412', subStat: 'ATK 30.3%',
            effect: 'Solar Radiance', desc: 'Sau khi dùng Kỹ năng Cộng hưởng, tăng 3% Tấn công mỗi 2 giây, tối đa 12% trong 12s.'
        },
        {
            id: 'lunar_cutter', name: 'Lunar Cutter', type: 'Sword', rarity: 4, atk: '412', subStat: 'ATK 30.3%',
            effect: 'Moonlight Shadow', desc: 'Nhận 6 tầng buff khi vào sân, mỗi tầng tăng 2% Tấn công. Giảm 1 tầng mỗi khi chịu sát thương.'
        },
        {
            id: 'novaburst', name: 'Novaburst', type: 'Pistols', rarity: 4, atk: '412', subStat: 'ATK 30.3%',
            effect: 'Starlight Blast', desc: 'Khi né đòn thành công hoặc lướt, tăng 8% Tấn công trong 8s, tối đa 3 tầng.'
        },
        {
            id: 'stonard', name: 'Stonard', type: 'Gauntlets', rarity: 4, atk: '412', subStat: 'Crit Rate 20.2%',
            effect: 'Heavy Impact', desc: 'Khi dùng Kỹ năng Cộng hưởng, tăng 18% Sát thương Giải phóng Cộng hưởng trong 15s.'
        },
        {
            id: 'variation', name: 'Variation', type: 'Rectifier', rarity: 4, atk: '337', subStat: 'Energy Regen 51.8%',
            effect: 'Melodic Cadence', desc: 'Khi dùng Kỹ năng Cộng hưởng, hồi phục ngay 8 Năng lượng Cộng hưởng (mỗi 20s một lần).'
        }
    ],

    echoes: [
        // Cost 4
        {
            id: 'bell_borne_geochelone', name: 'Bell-Borne Geochelone', cost: 4, sonata: ['Moonlit Clouds', 'Rejuvenating Glow'],
            skill: 'Bell-Borne Protection',
            desc: 'Hóa thân thành Linh Quy, tạo lá chắn Bell-Borne Shield giảm 50% sát thương nhận vào và tăng 10% sát thương gây ra cho toàn đội.'
        },
        {
            id: 'inferno_rider', name: 'Inferno Rider', cost: 4, sonata: ['Molten Rift'],
            skill: 'Blazing Slash',
            desc: 'Hóa thân thành kỵ sĩ xe máy rực lửa, chém liên hoàn gây sát thương Fusion cực lớn và tăng 12% sát thương Fusion + 12% sát thương đòn đánh thường.'
        },
        {
            id: 'feilian_beringal', name: 'Feilian Beringal', cost: 4, sonata: ['Sierra Gale'],
            skill: 'Tempest Kick',
            desc: 'Hóa thân thành vương khỉ càn quét kẻ địch bằng bão gió Aero, tăng 12% sát thương Aero và 12% sát thương Trọng kích.'
        },
        {
            id: 'thundering_mephis', name: 'Thundering Mephis', cost: 4, sonata: ['Void Thunder'],
            skill: 'Lightning Blitz',
            desc: 'Thực hiện chuỗi kiếm chớp nhoáng Electro, kết thúc bằng đòn giáng sấm sét tăng 12% sát thương Electro và 12% sát thương Giải phóng.'
        },
        {
            id: 'tempest_mephis', name: 'Tempest Mephis', cost: 4, sonata: ['Void Thunder'],
            skill: 'Thunder Claw',
            desc: 'Vung móng vuốt sấm sét tấn công, tăng 12% sát thương Electro và 12% sát thương Trọng kích.'
        },
        {
            id: 'crownless', name: 'Crownless', cost: 4, sonata: ['Havoc Eclipse'],
            skill: 'Havoc Flurry',
            desc: 'Hóa thân thành Crownless tung 5 đòn chém bóng tối liên hoàn, tăng 12% sát thương Havoc và 12% sát thương Kỹ năng Cộng hưởng.'
        },
        {
            id: 'dreamless', name: 'Dreamless', cost: 4, sonata: ['Havoc Eclipse'],
            skill: 'Beam of Destruction',
            desc: 'Bay lên không trung và xả luồng năng lượng Havoc hủy diệt. Tăng mạnh sát thương nếu Rover đang trong đội hình.'
        },
        {
            id: 'sentinel_jue', name: 'Sentinel Jué', cost: 4, sonata: ['Celestial Light'],
            skill: 'Radiant Dragon',
            desc: 'Triệu hồi Thần Long Jué giáng sấm sét Spectro, ban phước lành tăng 16% sát thương Kỹ năng Cộng hưởng trong 15s.'
        },

        // Cost 3
        {
            id: 'flautist', name: 'Flautist', cost: 3, sonata: ['Void Thunder', 'Lingering Tunes'],
            skill: 'Electro Beam', desc: 'Bắn ra tia laser Electro liên tục phía trước gây sát thương cao theo thời gian.'
        },
        {
            id: 'cyan_feathered_heron', name: 'Cyan-Feathered Heron', cost: 3, sonata: ['Sierra Gale', 'Celestial Light'],
            skill: 'Wind Charge', desc: 'Lao thẳng vào mục tiêu gây sát thương Aero, nếu ngắt đòn đặc biệt của địch sẽ gây thêm sát thương chí mạng.'
        },
        {
            id: 'violet_feathered_heron', name: 'Violet-Feathered Heron', cost: 3, sonata: ['Molten Rift', 'Havoc Eclipse'],
            skill: 'Havoc Block', desc: 'Vào thế đỡ đòn, phản công ngay lập tức bằng sát thương Havoc khi bị tấn công.'
        },
        {
            id: 'rocksteady_guardian', name: 'Rocksteady Guardian', cost: 3, sonata: ['Rejuvenating Glow', 'Moonlit Clouds'],
            skill: 'Shield Slam', desc: 'Dùng khiên tông mạnh vào kẻ địch gây sát thương Spectro, đồng thời nhận giáp bảo vệ.'
        },

        // Cost 1
        {
            id: 'zig_zag', name: 'Zig Zag', cost: 1, sonata: ['Celestial Light', 'Moonlit Clouds'],
            skill: 'Spectro Zone', desc: 'Tạo một vùng giam giữ Spectro làm chậm và sát thương các mục tiêu bên trong.'
        },
        {
            id: 'whiff_whaff', name: 'Whiff Whaff', cost: 1, sonata: ['Sierra Gale', 'Rejuvenating Glow'],
            skill: 'Wind Vortex', desc: 'Tạo lốc xoáy nhỏ hút kẻ địch lại gần và gây sát thương Aero.'
        },
        {
            id: 'tick_tack', name: 'Tick Tack', cost: 1, sonata: ['Havoc Eclipse', 'Lingering Tunes'],
            skill: 'Havoc Bite', desc: 'Lao tới cắn xé mục tiêu gây sát thương Havoc, giảm kháng vật lý của địch.'
        },
        {
            id: 'snip_snap', name: 'Snip Snap', cost: 1, sonata: ['Molten Rift', 'Lingering Tunes'],
            skill: 'Fire Ball', desc: 'Ném quả cầu lửa nhỏ gây sát thương Fusion diện rộng.'
        }
    ],

    sonatas: [
        { name: 'Freezing Frost', color: '#66ccff', effect2: 'Tăng 10% Sát thương Glacio.', effect5: 'Sau khi dùng đòn đánh thường hoặc trọng kích, tăng 10% sát thương Glacio, tối đa 3 tầng trong 15s.' },
        { name: 'Molten Rift', color: '#ff6633', effect2: 'Tăng 10% Sát thương Fusion.', effect5: 'Sau khi dùng Kỹ năng Cộng hưởng, tăng 30% sát thương Fusion trong 15s.' },
        { name: 'Void Thunder', color: '#cc66ff', effect2: 'Tăng 10% Sát thương Electro.', effect5: 'Sau khi dùng Trọng kích hoặc Kỹ năng Cộng hưởng, tăng 15% sát thương Electro, tối đa 2 tầng.' },
        { name: 'Sierra Gale', color: '#33ff99', effect2: 'Tăng 10% Sát thương Aero.', effect5: 'Sau khi dùng Intro Skill, tăng 30% sát thương Aero trong 15s.' },
        { name: 'Celestial Light', color: '#ffcc33', effect2: 'Tăng 10% Sát thương Spectro.', effect5: 'Sau khi dùng Intro Skill, tăng 30% sát thương Spectro trong 15s.' },
        { name: 'Havoc Eclipse', color: '#ff3366', effect2: 'Tăng 10% Sát thương Havoc.', effect5: 'Sau khi dùng đòn đánh thường hoặc trọng kích, tăng 7.5% sát thương Havoc, tối đa 4 tầng.' },
        { name: 'Rejuvenating Glow', color: '#66ff66', effect2: 'Tăng 10% Hiệu quả trị liệu.', effect5: 'Khi trị liệu cho đồng đội, tăng 15% Tấn công cho toàn đội trong 30s.' },
        { name: 'Moonlit Clouds', color: '#99ccff', effect2: 'Tăng 10% Hiệu suất Nạp năng lượng.', effect5: 'Sau khi dùng Outro Skill, nhân vật tiếp theo vào sân được tăng 22.5% Tấn công trong 15s.' },
        { name: 'Lingering Tunes', color: '#ff9966', effect2: 'Tăng 10% Tấn công.', effect5: 'Khi ở trên sân, nhận 5% Tấn công mỗi 1.5s, tối đa 4 tầng. Tăng 60% sát thương Outro Skill.' }
    ]
};

// Make database accessible globally
window.WUWA_DATA = WUWA_DATA;
