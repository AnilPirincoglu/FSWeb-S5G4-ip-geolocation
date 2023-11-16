import axios from 'axios';

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
		.then(function (response) {
			return response.data
		})
		.then(function (a) {
			benimIP = a
		});
}
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
	(tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
	https://apis.ergineer.com/ipgeoapi/91.243.116.69

	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.

*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
	DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
	</div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve
	bu kartı DOM olarak .cards elementinin içine ekleyin.
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün.
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine
	bilgisayarınızın IP adresini atayacaktır.
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP;
*/



//kodlar buraya gelecek

function geoFunc(obj) {

	const card = document.createElement("div");
	card.className = "card";

	const imgFlag = document.createElement("img");
	imgFlag.src = `https://flagsapi.com/${obj["ülkeKodu"]}/flat/64.png`;

	const cardInfo = document.createElement("div");
	cardInfo.className = "card-info";

	card.append(imgFlag, cardInfo);

	const ip = document.createElement("h3");
	ip.className = "ip";
	ip.textContent = obj["sorgu"];

	const ulke = document.createElement("p");
	ulke.className = "ulke";
	ulke.textContent = obj["ülke"] + "(" + obj["ülkeKodu"] + ")";

	const koordinat = document.createElement("p");
	koordinat.textContent = `Enlem: ${obj["enlem"]} Boylam: ${obj["boylam"]}`;

	const sehir = document.createElement("p");
	sehir.textContent = "Şehir: " + obj["bölgeAdı"];

	const saat = document.createElement("p");
	saat.textContent = "Saat dilimi: " + obj["saatdilimi"];

	const para = document.createElement("p");
	para.textContent = "Para birimi: " + obj["parabirimi"];

	const isp = document.createElement("p");
	sehir.textContent = "ISP: " + obj["isp"];

	cardInfo.append(ip, ulke, koordinat, sehir, saat, para, isp);

	return card;
}

const getData = async () => {
	await ipAdresimiAl();
	const ipGeo = axios.get("https://apis.ergineer.com/ipgeoapi/" + benimIP);
	ipGeo.then(response => {
		const div = geoFunc(response.data);
		document.querySelector("div.cards").append(div);
	});
};
getData();

