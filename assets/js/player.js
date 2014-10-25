var Player{
	
	var tempH = 2147483647;
	var tempA = 2147483647;
	
	var health = 100;
	var armor = 100;
	var damage = this.weapon.damage;
	var ammo = 128;
	
	var healthCap = 100;
	var armorCap = 100;
	var ammoCap = 128;
	
	function takeDamage(dam){
		damage = damage - dam;
	}
	function regainHealth(reg){
		health = health + reg;
	}
	
	function boostHealth{
		tempH = health;
		health = 2147483647;
	}
	function unboostHealth{
		health = tempH;
		tempH = 2147483647;
	}
	function boostAmmo{
		tempA = ammo;
		ammo = 2147483647;
	}
	function unboostAmmo{
		ammo = tempA;
		tempA = 2147483647;
	}

	function increaseHealthCap{
		healthCap = healthCap * 1.15;
		health = healthCap;
		armor = armorCap;
		ammo = ammoCap;
	}
	function increaseArmorCap{
		armorCap = armorCap * 1.15;
		health = healthCap;
		armor = armorCap;
		ammo = ammoCap;
		
	}
	function increaseDamageCap{
		damage = damage * 1.15;
		health = healthCap;
		armor = armorCap;
		ammo = ammoCap;
		
	}
	function increaseAmmoCap{
		ammoCap = ammoCap * 1.15;
		health = healthCap;
		armor = armorCap;
		ammo = ammoCap;
		
	}
	
};