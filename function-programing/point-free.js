const users = [{
	name: 'john lennon',
	sex: 'male',
	phone: '123'
},
{
	name: 'prince',
	sex: 'male',
	phone: '234'
},
{
	name: 'rihanna',
	sex: 'female',
	phone: '345'
},
{
	name: 'taylor swift',
	sex: 'female',
	phone: '456'
}
];

// 找出所有女性的phone

const FemaleUser = users => {
	return users.filter(u => u.sex === 'female');
};
const getPhone = users => {
	return users.map(u => u.phone);
};
const compose = (femaleUser, getPhone) => (x) => getPhone(femaleUser(x));

const getFemaleUserPhone = compose(FemaleUser, getPhone);
console.log(getFemaleUserPhone(users));