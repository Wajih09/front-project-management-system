import React from 'react'
import SubscriptionCard from './SubscriptionCard';
import { useSelector } from 'react-redux';

const paidPlan = [
    "Add unlimited projects",
    "Access to live chat",
    "Add unlimited team members",
    "Advanced Reporting",
    "Priority Support",
    "Customization Options",
    "Integration Support",
    "Advanced Security",
    "Training and Resources",
    "Access Control",
    "Custom Worflows"
]

const annualPlan = [
    "Add unlimited projects",
    "Access to live chat",
    "Add unlimited team members",
    "Advanced Reporting",
    "Priority Support",
    "Everything which monthly plan has"
];

const freePlan = [
    "Add only 3 projects",
    "Basic Task Management",
    "Project Collaboration",
    "Basic Reporting",
    "Email Notifiacations",
    "Basic Access Control"
];

const Subscription = () => {
    const {subscription} = useSelector(store => store);
    return (
        <div className='p-10'>
            <h1 className='text-5xl font-semibold py-5 pb-16 text-center'>Pricing</h1>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-9'>
                {/* {[1,1,1].map((item) => <SubscriptionCard/> it duplicate it to 3 also */}
                {/* data={} here are props 10h20min */}
                <SubscriptionCard data={{
                    planName: "Free", features: freePlan, planType: "FREE",
                    // price: 0, buttonName: true ? "Current Plan" : "Get Started" 4h01min
                    price: 0, buttonName: subscription.userSubscription?.planType == "FREE" ? "Current Plan" : "Get Started"
                }} />
                <SubscriptionCard data={{
                    planName: "Monthly Paid Plan", features: paidPlan, planType: "MONTHLY",
                    price: 9.9, buttonName: subscription.userSubscription?.planType == "MONTHLY" ? "Current Plan" : "Get Started"
                }}/>
                <SubscriptionCard data={{
                    planName: "Annual Paid Plan", features: freePlan, planType: "ANNUALLY",
                    price: 100, buttonName: subscription.userSubscription?.planType == "ANNUALLY" ? "Current Plan" : "Get Started"
                }}/>
            </div>
        </div>
    )
}

export default Subscription