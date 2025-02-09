class PointSystem {
    constructor() {
        this.RATES = {
            FARMING: {
                BASE_RATE: 12, // points per hour
                BOOST_MULTIPLIER: 20,
                MAX_POINTS: 1000
            },
            TASKS: {
                SOCIAL_MEDIA: 20000,
                AIRDROP_VERIFY: 220
            },
            REFERRAL: {
                DIRECT: 0.10,    // 10%
                INDIRECT: 0.025  // 2.5%
            }
        };
    }

    // Farming puanı hesaplama
    calculateFarmingPoints(timeElapsed, isBoostActive) {
        const basePoints = (timeElapsed / 3600) * this.RATES.FARMING.BASE_RATE;
        const multiplier = isBoostActive ? this.RATES.FARMING.BOOST_MULTIPLIER : 1;
        return Math.min(basePoints * multiplier, this.RATES.FARMING.MAX_POINTS);
    }

    // Referral puanı hesaplama
    calculateReferralPoints(amount, isIndirect = false) {
        const rate = isIndirect ? this.RATES.REFERRAL.INDIRECT : this.RATES.REFERRAL.DIRECT;
        return amount * rate;
    }
} 
