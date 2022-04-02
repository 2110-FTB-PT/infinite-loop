import React from "react";
import "../../style/Support.css";

const Shipping = () => {
  return (
    <>
      <div className='support-hero-container'>
        <div className='support-hero-header'>Shipping</div>
        <div className='support-hero-subhead'>
          Standard Processing and Shipping Timelines
        </div>

        <div className='support-body-content-container'>
          <div className='support-content'>
            <div className='support-label'>Where do you ship?</div>
            <div className='support-description'>
              We currently ship within the US to all 48 states.
            </div>
          </div>

          <div className='support-content'>
            <div className='support-label'>
              When can I expect my order to ship?
            </div>
            <div className='support-description'>
              Orders may take 2-6 business days to ship given the current
              policies and procedures to protect the health and safety of our
              fulfillment team. Once each package is out the door, you’ll
              automatically receive tracking information so you can keep an eye
              out for it. Once in transit, packages take 1-4 business days to
              arrive. We do not have control over carrier service disruptions or
              delays once shipped. Plants and botanicals that are part of the
              same order may ship separately from different locations, so your
              order could arrive in multiple packages on slightly different
              timelines. You'll receive order tracking information for each item
              once shipped. Note: We carry an assortment of products from
              independent makers and brands that share our aesthetic, values,
              and vibe. These products ship directly from the third party vendor
              or artisan within 2-6 business days, unless noted otherwise on the
              product page.
            </div>
          </div>

          <div className='support-content'>
            <div className='support-label'>Can I get same day delivery?</div>
            <div className='support-description'>
              We do not offer same day delivery.
            </div>
          </div>

          <div className='support-content'>
            <div className='support-label'>What are your shipping rates?</div>
            <div className='support-description'>
              Shipping rates may vary based on where your order is being shipped
              and time of year. As you can imagine, a lot goes into ensuring
              happy, healthy plants arrive at your door!
              <ul>
                <li>Orders under $10 have a $5 flat shipping fee</li>
                <li>Orders between $10 to $100 have a $10 flat shipping fee</li>
                <li>Orders over $100 have a $25 flat shipping fee</li>
              </ul>
              We are committed to reducing its environmental footprint. Nearly
              all packages ship via UPS® carbon neutral shipping. This means we
              (not you) pay a contractual rate per package that ensures we
              offset our shipping footprint and reduce our annual emissions as a
              company.
            </div>
          </div>

          <div className='support-content'>
            <div className='support-label'>
              If I order more than one plant will they ship separately?
            </div>
            <div className='support-description'>
              Items that are part of the same order may ship separately from
              different locations. Your order could arrive in multiple packages
              at slightly different times. Once each plant or botanical package
              is out the door, you’ll receive individual tracking information so
              you can keep an eye out for it.
            </div>
          </div>

          <div className='support-content'>
            <div className='support-label'>What is your return policy?</div>
            <div className='support-description'>
              If your order arrived damaged, let customer service know within 14
              days so we can replace it. Photos are required as proof of damage
              upon arrival and to help us improve our packaging process.
              Otherwise, we cannot offer returns or exchanges.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
