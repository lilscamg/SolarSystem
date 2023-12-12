const sunRadius = 109;

export const PlanetParameters = {
    realRadiuses: {
        Sun: sunRadius, 
        Mercury: 0.38,
        Venus: 0.95,
        Earth: 1,
        Mars: 0.5,
        Jupiter: 11.2,
        Saturn: 9.5,
        Uranus: 3.98,
        Neptune: 3.86,
    },
    fancyRadiuses: {
        Sun: 60,
        Mercury: 6,
        Venus: 15,
        Earth: 20,
        Mars: 18,
        Jupiter: 45,
        Saturn: 40,
        Uranus: 35,
        Neptune: 34,
    },
    realDistanceToSun: {
        Sun: 0,
        Mercury: 120 + sunRadius,
        Venus: 223 + sunRadius,
        Earth: 310 + sunRadius,
        Mars: 471 + sunRadius,
        Jupiter: 1609 + sunRadius,
        Saturn: 2956 + sunRadius,
        Uranus: 9304 + sunRadius,
        Neptune: 12233 + sunRadius,
    },
    fancyDistanceToSun: {
        Sun: 0,
        Mercury: 150,
        Venus: 250,
        Earth: 350,
        Mars: 470,
        Jupiter: 700,
        Saturn: 900,
        Uranus: 1100,
        Neptune: 1300,
    },
    sunSpeed: {
        Mercury: 47.36 * 0.01,
        Venus: 35.02 * 0.01,
        Earth: 26.71 * 0.01,
        Mars: 24.13 * 0.01,
        Jupiter: 13.07 * 0.01,
        Saturn: 9.69 * 0.01,
        Uranus: 6.81 * 0.01,
        Neptune: 5.43 * 0.01,
    },
    axisSpeed: {
        Mercury: (360 / 59 / 24) * 0.1, // в долях суток
        Venus: (360 / 243 / 24) * 0.1, // в долях суток
        Earth: (360 / 24) * 0.1, // в часах
        Mars: (360 / 24.67) * 0.1, // в часах
        Jupiter: (360 / 9.83) * 0.1, // в часах
        Saturn: (360 / 10.5) * 0.1, // в часах
        Uranus: (360 / 17) * 0.1, // в часах
        Neptune: (360 / 16) * 0.1, // в часах
    }
}

export const RingParameters = {
    innerRadiuses: {
        Saturn: 1.7,
        Neptune: 2
    },
    outerRadiuses: {
        Saturn: 2.3,
        Neptune: 4
    }
}