import os
import re

# Complete Product Configurations for all 13 Loan Products
PRODUCTS = [
    {
        "id": "personal",
        "file": "personal-loan.html",
        "name": "Personal Loan",
        "category": "Unsecured Personal Financing",
        "headline": "Make Every Life Plan Possible with Instant Disbursal up to ₹40 Lakhs",
        "description": "Borrow up to ₹40 Lakhs with attractive interest rates starting at 10.49% p.a., flexible repayment tenures up to 7 years, zero collateral, and same-day fund transfer.",
        "pills": ["Interest from 10.49% p.a.", "Up to ₹40 Lakhs", "Tenure 1 to 7 Yrs", "Zero Collateral"],
        "hero_img": "images/personal-loan-hero.jpg",
        "badge1_icon": "⚡",
        "badge1_title": "Disbursal in 2 Hrs",
        "badge1_sub": "100% Digital Journey",
        "badge2_icon": "🛡️",
        "badge2_title": "Zero Collateral",
        "badge2_sub": "No guarantor required",
        "caption_title": "Personal Loans tailored for life milestones",
        "caption_sub": "Weddings, home renovation, medical care, dream travel & debt payoff.",
        "has_purposes": True,
        "calc_type": "personal",
        "calc_title": "Personal Loan EMI Calculator",
        "calc_badge": "INSTANT ESTIMATE",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcAmount">Required Loan Amount</label>
                <output id="calcAmountOut">₹5,00,000</output>
              </div>
              <input id="calcAmount" class="calc-range" type="range" min="50000" max="4000000" step="25000" value="500000">
              <div class="calc-range-limits"><span>₹50K</span><span>₹40 Lakhs</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="100000">₹1L</button>
                <button type="button" class="calc-chip active" data-target="calcAmount" data-val="500000">₹5L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="1000000">₹10L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="2000000">₹20L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="4000000">₹40L</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Tenure</label>
                  <output id="calcTenureOut">5 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="1" max="7" step="1" value="5">
                <div class="calc-range-limits"><span>1 Yr</span><span>7 Yrs</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcRate">Interest Rate</label>
                  <output id="calcRateOut">10.49%</output>
                </div>
                <input id="calcRate" class="calc-range" type="range" min="10.49" max="24" step="0.25" value="10.49">
                <div class="calc-range-limits"><span>10.49%</span><span>24%</span></div>
              </div>
            </div>
        """,
        "benefits": [
            ("⚡", "Disbursal in 24 Hours", "Funds credited directly to your bank account post digital approval."),
            ("📋", "Zero Physical Docs", "Complete paperless journey via Aadhaar and DigiLocker verification."),
            ("🛡️", "No Collateral Required", "100% unsecured loan based purely on your income and credit profile."),
            ("🔄", "Flexible 1-7 Yrs Tenure", "Choose monthly installments that align seamlessly with your budget.")
        ],
        "features": [
            ("💰", "High Loan Quantum", "Borrow up to ₹40 Lakhs to fund weddings, home improvements, medical emergencies, or global travel."),
            ("📉", "Competitive Interest Rates", "Transparent rates starting at 10.49% p.a. calculated on a reducing balance schedule."),
            ("🔒", "Zero Hidden Charges", "No unannounced administrative fees. All processing and prepayment rules clearly declared upfront."),
            ("📱", "100% Digital Journey", "Check eligibility, upload salary slips, complete video KYC, and e-sign your loan agreement online."),
            ("💼", "Customised for Salaried & Self-Employed", "Tailored credit assessment criteria catering to private sector, PSU, MNC employees, and self-employed professionals."),
            ("💳", "Part-Prepayment Facility", "Reduce your interest burden anytime by prepaying surplus funds without heavy penalties.")
        ],
        "eligibility_salaried": ["Age: 21 to 60 years at loan maturity", "Min. Net Monthly Income: ₹25,000 in metro cities (₹20,000 non-metro)", "Min. Work Experience: 1 year overall, 6 months with current employer", "CIBIL Score: 680 and above for optimal rates"],
        "eligibility_self": ["Age: 23 to 65 years", "Min. Annual Turnover / Net Income: ₹3,00,000 as per latest ITR", "Business Vintage: Minimum 2 consecutive years in current business/profession", "CIBIL Score: 700 and above with clean repayment track record"],
        "rate_range": "10.49% – 22.00% p.a.",
        "proc_fee": "1.00% – 2.50% of loan amount + GST",
        "foreclosure_fee": "Zero for floating rate; 2% to 4% after 12 months for fixed",
        "faqs": [
            ("How much personal loan can I borrow with Finora?", "Finora partners offer unsecured personal loans ranging from ₹50,000 up to ₹40,00,000 depending on your monthly take-home salary, existing obligations (FOIR), and credit score."),
            ("What is the minimum CIBIL score required for a personal loan?", "A CIBIL score of 680 or higher is recommended. Borrowers with a score above 750 enjoy our lowest interest rates starting from 10.49% p.a."),
            ("Can I prepay or foreclose my personal loan early?", "Yes. You can make part-prepayments or foreclose the loan after completing 6 to 12 monthly installments. Specific charges are governed by your loan agreement."),
            ("How quickly will the loan amount be credited?", "For pre-approved customers with digital video-KYC, funds are transferred within 15 minutes to 24 hours directly into your primary bank account."),
            ("Is there any restriction on how I spend the loan funds?", "No. Finora personal loans have complete end-use flexibility—use it for home renovations, weddings, medical expenses, travel, or debt clearance.")
        ],
        "related": [("Insta Personal Loan", "insta-personal-loan.html", "100% paperless fast approval"), ("Debt Consolidation Loan", "debt-consolidation-loan.html", "Combine multi-debt into one EMI"), ("Medical Loan", "medical-loan.html", "Emergency medical support")]
    },
    {
        "id": "insta",
        "file": "insta-personal-loan.html",
        "name": "Insta Personal Loan",
        "hero_img": "images/loan-insta.jpg",
        "badge1_icon": "⚡",
        "badge1_title": "30-Min Disbursal",
        "badge1_sub": "Pre-approved instant funds",
        "badge2_icon": "📲",
        "badge2_title": "100% Paperless",
        "badge2_sub": "Zero physical paperwork",
        "caption_title": "Express liquidity when minutes matter",
        "caption_sub": "One-tap digital sanction for urgent personal cash requirements.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Pre-Approved Digital Financing",
        "headline": "Get Funds Disbursed to Your Account in Under 15 Minutes",
        "description": "Pre-approved digital loan offers up to ₹10 Lakhs with instant video KYC, zero physical documentation, and 24x7 immediate disbursal into your bank account.",
        "pills": ["15-Minute Disbursal", "Up to ₹10 Lakhs", "100% Paperless", "24x7 Digital Access"],
        "hero_img": "images/loan-insta.jpg",
        "calc_type": "insta",
        "calc_title": "Insta Loan Fast Estimator",
        "calc_badge": "INSTANT DISBURSAL",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcAmount">Instant Loan Amount</label>
                <output id="calcAmountOut">₹2,50,000</output>
              </div>
              <input id="calcAmount" class="calc-range" type="range" min="25000" max="1000000" step="10000" value="250000">
              <div class="calc-range-limits"><span>₹25K</span><span>₹10 Lakhs</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="50000">₹50K</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="100000">₹1L</button>
                <button type="button" class="calc-chip active" data-target="calcAmount" data-val="250000">₹2.5L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="500000">₹5L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="1000000">₹10L</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Tenure</label>
                  <output id="calcTenureOut">2 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="1" max="4" step="1" value="2">
                <div class="calc-range-limits"><span>1 Yr</span><span>4 Yrs</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcRate">Interest Rate</label>
                  <output id="calcRateOut">11.49%</output>
                </div>
                <input id="calcRate" class="calc-range" type="range" min="11.49" max="22" step="0.25" value="11.49">
                <div class="calc-range-limits"><span>11.49%</span><span>22%</span></div>
              </div>
            </div>
        """,
        "benefits": [
            ("⏱️", "15-Min Disbursal", "Fastest digital credit pipeline with zero physical human intervention."),
            ("📲", "Video KYC on Mobile", "Complete verification in 3 minutes using your smartphone camera."),
            ("🏦", "Pre-Approved Offers", "Existing bank customers qualify with 1-click eligibility check."),
            ("🔐", "Safe DigiLocker Sync", "Fetch verified identity & income records securely through RBI-compliant gateway.")
        ],
        "features": [
            ("⚡", "Immediate Cash Flow", "Direct NEFT/IMPS transfer to your verified salary bank account within minutes."),
            ("📄", "No Physical Document Upload", "Paperless verification via Aadhaar OTP and bank account net-banking statement reader."),
            ("🎯", "Pre-Calculated EMIs", "Fixed, transparent monthly deduction with automatic e-mandate (NACH)."),
            ("🌙", "24/7 Availability", "Apply on weekends, public holidays, or late nights—our automated underwriting never sleeps."),
            ("🛡️", "Unsecured Convenience", "Zero hypothecation or guarantor required."),
            ("💡", "Short to Medium Tenures", "Flexible tenures from 6 months up to 48 months for manageable short-term requirements.")
        ],
        "eligibility_salaried": ["Age: 21 to 58 years", "Min. Net Monthly Income: ₹20,000", "Active Netbanking or UPI-linked bank account", "CIBIL Score: 670+"],
        "eligibility_self": ["Age: 23 to 62 years", "Active GST/ITR registration with regular UPI/Bank inflows", "Bank statements of latest 6 months", "CIBIL Score: 690+"],
        "rate_range": "11.49% – 24.00% p.a.",
        "proc_fee": "1.50% – 2.00% of loan amount",
        "foreclosure_fee": "Standard 2% to 3% after 6 completed installments",
        "faqs": [
            ("How is an Insta Personal Loan different from a regular Personal Loan?", "An Insta Personal Loan is 100% automated and paperless with pre-approved underwriting, allowing disbursals in under 15 minutes without visiting any branch."),
            ("Do I need to submit physical paper documents?", "No. The entire verification takes place via Aadhaar OTP, PAN database check, and automated netbanking account aggregators."),
            ("Can I apply if I am not an existing customer?", "Yes, new customers with a solid credit score and verifiable income can complete a 3-minute video KYC to receive instant sanction.")
        ],
        "related": [("Personal Loan", "personal-loan.html", "Higher limits up to ₹40L"), ("Easy EMI Loan", "easy-emi-loan.html", "Split shopping purchases"), ("Medical Loan", "medical-loan.html", "Emergency medical funding")]
    },
    {
        "id": "business",
        "file": "business-loan.html",
        "name": "Business Loan",
        "hero_img": "images/purpose-business.jpg",
        "badge1_icon": "💼",
        "badge1_title": "Up to ₹75 Lakhs",
        "badge1_sub": "Working capital & capex",
        "badge2_icon": "📈",
        "badge2_title": "Zero Collateral",
        "badge2_sub": "Unsecured MSME financing",
        "caption_title": "Fuel your enterprise growth & cashflow",
        "caption_sub": "Fast business loan sanction based on GST & turnover health.",
        "self_avatar": "images/profile-business.jpg",
        "category": "Commercial & Enterprise Financing",
        "headline": "Fuel Enterprise Growth with Collateral-Free Capital up to ₹75 Lakhs",
        "description": "Empower your business with unsecured working capital and machinery loans up to ₹75 Lakhs, competitive interest rates, tax-deductible interest, and rapid 48-hour sanction.",
        "pills": ["Up to ₹75 Lakhs", "Zero Collateral", "Tenure 1 to 5 Yrs", "Tax-Deductible Interest"],
        "hero_img": "images/loan-business.jpg",
        "calc_type": "business",
        "calc_title": "Business Loan Outflow Estimator",
        "calc_badge": "COMMERCIAL CREDIT",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcAmount">Business Loan Requirement</label>
                <output id="calcAmountOut">₹15,00,000</output>
              </div>
              <input id="calcAmount" class="calc-range" type="range" min="100000" max="7500000" step="50000" value="1500000">
              <div class="calc-range-limits"><span>₹1 Lakh</span><span>₹75 Lakhs</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="500000">₹5L</button>
                <button type="button" class="calc-chip active" data-target="calcAmount" data-val="1500000">₹15L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="2500000">₹25L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="5000000">₹50L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="7500000">₹75L</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Tenure</label>
                  <output id="calcTenureOut">3 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="1" max="5" step="1" value="3">
                <div class="calc-range-limits"><span>1 Yr</span><span>5 Yrs</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcRate">Interest Rate</label>
                  <output id="calcRateOut">11.99%</output>
                </div>
                <input id="calcRate" class="calc-range" type="range" min="11.25" max="22" step="0.25" value="11.99">
                <div class="calc-range-limits"><span>11.25%</span><span>22%</span></div>
              </div>
            </div>
        """,
        "benefits": [
            ("🏢", "Zero Asset Pledge", "Protect personal assets while raising capital purely against enterprise cash flow."),
            ("📊", "Higher Working Capital", "Borrow up to ₹75 Lakhs to bridge seasonal gaps and inventory cycles."),
            ("📑", "Tax Efficiency", "Interest paid on business loans is 100% tax-deductible as a valid business expense."),
            ("🚀", "Rapid 48-Hour Sanction", "Prompt review based on GST returns and current account banking velocity.")
        ],
        "features": [
            ("📈", "Growth-Oriented Capital", "Use funds for machinery purchase, supplier bulk-discounts, technology upgrades, or hiring."),
            ("💼", "Structured Cash-Flow Tenures", "Repayment horizons from 12 to 60 months tailored to your business operational cycle."),
            ("📉", "Interest Rate starting 11.25% p.a.", "Attractive commercial borrowing rates for businesses with strong banking track record."),
            ("🔍", "Transparent Processing", "Clearly declared charges with zero surprise audit or documentation levies."),
            ("🏷️", "Flexible Dropline / Term Options", "Choose between term loan with steady EMI or overdraft facility for revolving needs."),
            ("🤝", "Dedicated Business Loan Specialist", "Personal relationship manager assigned to coordinate sanction and documentation.")
        ],
        "eligibility_salaried": ["Not applicable for salaried employees (Personal / Insta Loan recommended)"],
        "eligibility_self": ["Business Vintage: Minimum 2 years of active continuous operations", "Annual Turnover: ₹20 Lakhs and above with positive net profit", "GST Returns: Filed regularly for at least 12 months", "CIBIL / Commercial Credit Score: 680+"],
        "rate_range": "11.25% – 21.00% p.a.",
        "proc_fee": "1.50% – 2.50% of sanctioned amount",
        "foreclosure_fee": "2% to 4% after 6 months; NIL for Micro-enterprises as per RBI norms",
        "faqs": [
            ("Do I need to pledge collateral for a Finora business loan?", "No. Finora offers collateral-free business loans up to ₹75 Lakhs. Approval is based on your business turnover, banking track record, and operational cash flows."),
            ("What financial documents are required?", "Standard requirements include 2 years ITR with computation, audited P&L/Balance Sheet (if applicable), 12 months GST returns, and 6 months business bank statement."),
            ("How does a business loan impact my business taxes?", "Interest paid on a commercial loan is classified as a legitimate business expense and can be deducted from your taxable business profits under the Income Tax Act.")
        ],
        "related": [("Loan Against Property", "loan-against-property.html", "Larger capital up to ₹10Cr"), ("Loan Against Securities", "loan-against-securities.html", "Overdraft on equity & MF"), ("Personal Loan", "personal-loan.html", "Personal financing options")]
    },
    {
        "id": "home",
        "file": "home-loan.html",
        "name": "Home Loan",
        "hero_img": "images/loan-home.jpg",
        "badge1_icon": "🏡",
        "badge1_title": "Lowest 8.40% p.a.",
        "badge1_sub": "Save up to ₹5L in interest",
        "badge2_icon": "🔑",
        "badge2_title": "Up to 90% LTV",
        "badge2_sub": "Tenure up to 30 years",
        "caption_title": "Your dream home with comfortable EMIs",
        "caption_sub": "New purchase, resale, plot construction and home balance transfer.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Residential Housing Credit",
        "headline": "Turn the Key to Your Dream Home with Rates Starting from 8.40% p.a.",
        "description": "Affordable home loans up to ₹5 Crore with long repayment tenures up to 30 years, zero prepayment penalties for floating rate borrowers, and tax savings under Section 24(b) & 80C.",
        "pills": ["Rates from 8.40% p.a.", "Tenure up to 30 Yrs", "Up to 90% Property Value", "Tax Benefits up to ₹3.5L"],
        "hero_img": "images/loan-home.jpg",
        "calc_type": "home",
        "calc_title": "Home Loan EMI & Tax Calculator",
        "calc_badge": "LOWEST APR",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcAmount">Home Financing Amount</label>
                <output id="calcAmountOut">₹50,00,000</output>
              </div>
              <input id="calcAmount" class="calc-range" type="range" min="1000000" max="50000000" step="500000" value="5000000">
              <div class="calc-range-limits"><span>₹10 Lakhs</span><span>₹5 Crore</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="2500000">₹25L</button>
                <button type="button" class="calc-chip active" data-target="calcAmount" data-val="5000000">₹50L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="10000000">₹1 Cr</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="20000000">₹2 Cr</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="50000000">₹5 Cr</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Tenure</label>
                  <output id="calcTenureOut">20 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="5" max="30" step="1" value="20">
                <div class="calc-range-limits"><span>5 Yrs</span><span>30 Yrs</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcRate">Interest Rate</label>
                  <output id="calcRateOut">8.40%</output>
                </div>
                <input id="calcRate" class="calc-range" type="range" min="8.40" max="11.5" step="0.1" value="8.40">
                <div class="calc-range-limits"><span>8.40%</span><span>11.5%</span></div>
              </div>
            </div>
        """,
        "benefits": [
            ("🏡", "Lowest Rates from 8.40%", "Avail the most competitive housing interest rates linked directly to RBI Repo Rate."),
            ("⏳", "Tenures up to 30 Years", "Keep your monthly EMIs ultra-low with extended repayment options."),
            ("💸", "Tax Savings up to ₹3.5L", "Save under Section 24(b) (up to ₹2L interest) and Section 80C (up to ₹1.5L principal)."),
            ("🔓", "Zero Prepayment Penalty", "Floating rate individual borrowers can prepay anytime with zero penalty as per RBI mandate.")
        ],
        "features": [
            ("🏗️", "Purchase, Construction & Renovation", "Applicable for ready-to-move flats, under-construction apartments, plot purchase, or self-construction."),
            ("🔄", "Home Loan Balance Transfer", "Switch your existing expensive housing loan to Finora for lower interest rates and additional top-up funds."),
            ("🛡️", "Legal & Technical Assurance", "Partner lenders conduct thorough title due-diligence ensuring clean, dispute-free property ownership."),
            ("👥", "Co-Applicant Benefits", "Add your spouse or working parents as co-applicants to significantly boost eligible loan eligibility."),
            ("💰", "High LTV Financing", "Get up to 90% financing for loans up to ₹30 Lakhs, and up to 80% for higher ticket sizes."),
            ("📜", "Pre-Approved Housing Loans", "Get loan sanction in principle before finalizing your dream property so you can negotiate with confidence.")
        ],
        "eligibility_salaried": ["Age: 21 to 65 years at maturity", "Employment: Min 2 years total experience, 1 year in current firm", "Min. Salary: ₹30,000/month", "CIBIL Score: 700+ for best interest slab"],
        "eligibility_self": ["Age: 23 to 70 years", "Business Vintage: 3 years in current line of business", "Audited Financials / ITR with positive operational profit", "CIBIL Score: 720+"],
        "rate_range": "8.40% – 10.75% p.a. (Floating)",
        "proc_fee": "0.25% – 0.50% (Max ₹10,000 - ₹15,000 + GST)",
        "foreclosure_fee": "NIL for floating rate individual borrowers",
        "faqs": [
            ("What are the tax benefits of a Finora home loan?", "Under Section 24(b), you can claim up to ₹2,00,000 per financial year against interest paid on a self-occupied home. Under Section 80C, principal repayment up to ₹1,50,000 is deductible."),
            ("Can I transfer my existing home loan to Finora?", "Yes! Our balance transfer service helps you refinance from high-interest lenders to partner bank rates as low as 8.40% p.a. with minimal legal processing."),
            ("What percentage of the property value can I borrow?", "As per RBI guidelines: up to 90% for property value up to ₹30 Lakhs; up to 80% for loans between ₹30 Lakhs and ₹75 Lakhs; and up to 75% for loans above ₹75 Lakhs.")
        ],
        "related": [("Loan Against Property", "loan-against-property.html", "Financing against existing property"), ("Personal Loan", "personal-loan.html", "Home furnishing & interior loan"), ("Debt Consolidation Loan", "debt-consolidation-loan.html", "Consolidate multiple obligations")]
    },
    {
        "id": "property",
        "file": "loan-against-property.html",
        "name": "Loan Against Property",
        "category": "Secured Real Estate Mortgage",
        "headline": "Unlock High-Value Capital up to ₹10 Crore by Pledging Real Estate",
        "description": "Monetize your residential, commercial or industrial property to raise large-ticket funding up to ₹10 Crore with extended 15-year tenures and much lower interest rates than unsecured credit.",
        "pills": ["Up to ₹10 Crore", "Up to 70% Property Value", "Tenure up to 15 Yrs", "Lower Interest Rate"],
        "hero_img": "images/loan-property.jpg",
        "calc_type": "property",
        "calc_title": "LAP Valuation & EMI Estimator",
        "calc_badge": "HIGH VALUE SECURED",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcPropVal">Market Value of Property</label>
                <output id="calcPropValOut">₹1,00,00,000</output>
              </div>
              <input id="calcPropVal" class="calc-range" type="range" min="2500000" max="100000000" step="1000000" value="10000000">
              <div class="calc-range-limits"><span>₹25 Lakhs</span><span>₹10 Crore</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcPropVal" data-val="5000000">₹50L</button>
                <button type="button" class="calc-chip active" data-target="calcPropVal" data-val="10000000">₹1 Cr</button>
                <button type="button" class="calc-chip" data-target="calcPropVal" data-val="25000000">₹2.5 Cr</button>
                <button type="button" class="calc-chip" data-target="calcPropVal" data-val="50000000">₹5 Cr</button>
                <button type="button" class="calc-chip" data-target="calcPropVal" data-val="100000000">₹10 Cr</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcLtv">Desired LTV (% of value)</label>
                  <output id="calcLtvOut">65% LTV</output>
                </div>
                <input id="calcLtv" class="calc-range" type="range" min="40" max="70" step="5" value="65">
                <div class="calc-range-limits"><span>40%</span><span>70%</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Tenure</label>
                  <output id="calcTenureOut">10 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="3" max="15" step="1" value="10">
                <div class="calc-range-limits"><span>3 Yrs</span><span>15 Yrs</span></div>
              </div>
            </div>
        """,
        "benefits": [
            ("🏢", "Retain Full Ownership", "Continue residing or earning rental income while your property acts as collateral."),
            ("📉", "Cheaper than Personal Loans", "Mortgage security unlocks significantly lower interest rates compared to unsecured personal credit."),
            ("💎", "Substantial Capital Pool", "Borrow up to ₹10 Crore to expand your business, fund daughter's overseas education or clear debts."),
            ("📅", "Extended 15-Year Horizon", "Longer tenure ensures stress-free monthly installments that do not strain cash flow.")
        ],
        "features": [
            ("🏘️", "All Property Types Accepted", "Pledge fully-constructed residential houses, self-occupied flats, commercial offices, or registered industrial units."),
            ("🎯", "No End-Use Restrictions", "Use the sanctioned amount for business expansion, working capital, debt consolidation, or major personal goals."),
            ("📊", "Higher LTV (Loan to Value)", "Get up to 70% of fair market property valuation based on professional technical assessment."),
            ("🔄", "Dropline Overdraft Facility", "Opt for an overdraft mortgage where you only pay interest on utilized funds while withdrawing as needed."),
            ("🤝", "Dual Earning Co-Borrowers", "Include family co-owners or business partners to qualify for substantial sanction limits."),
            ("⚖️", "Transparent Title Evaluation", "Professional legal verification of deed, encumbrance certificate, and municipal approvals.")
        ],
        "eligibility_salaried": ["Age: 25 to 65 years", "Property must have clear, marketable, unencumbered title deed", "Min. Salary: ₹40,000/month", "CIBIL Score: 680+"],
        "eligibility_self": ["Age: 25 to 70 years", "Business Vintage: 3+ years in continuous operation", "ITR records showing steady net profit", "Property in applicant/co-applicant name"],
        "rate_range": "9.15% – 12.50% p.a.",
        "proc_fee": "0.50% – 1.00% + legal/technical valuation costs",
        "foreclosure_fee": "NIL for individual borrowers on floating rates",
        "faqs": [
            ("Can I take a loan against a commercial property?", "Yes. Finora supports loans against residential houses, residential apartments, commercial offices, and commercial retail shops with clear title deeds."),
            ("Can I continue to use or lease the property after taking LAP?", "Absolutely. You retain full ownership, possession, and rental rights. The bank only retains equitable mortgage lien until the loan is fully repaid."),
            ("How is the property value calculated?", "An empanelled bank technical valuer inspects the property to calculate the current fair market price and structural condition.")
        ],
        "related": [("Home Loan", "home-loan.html", "New home purchase financing"), ("Business Loan", "business-loan.html", "Unsecured working capital"), ("Loan Against Securities", "loan-against-securities.html", "Overdraft on financial assets")]
    },
    {
        "id": "gold",
        "file": "gold-loan.html",
        "name": "Gold Loan",
        "hero_img": "images/loan-gold.jpg",
        "badge1_icon": "🪙",
        "badge1_title": "Cash in 15 Mins",
        "badge1_sub": "Same-day branch disbursal",
        "badge2_icon": "🔒",
        "badge2_title": "Free Safe Vault",
        "badge2_sub": "100% insured bank locker",
        "caption_title": "Instant funds against gold ornaments",
        "caption_sub": "Best per-gram rates with monthly interest from 0.75%.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Immediate Asset-Backed Liquidity",
        "headline": "Instant Liquidity Against Gold Jewellery from 0.75% per Month",
        "description": "Unlock instant funds against gold jewellery in just 30 minutes with maximum RBI-mandated 75% LTV, certified weighing, bank vault safety, and zero income proof requirements.",
        "pills": ["Rates from 0.75%/mo", "30-Min Disbursal", "Up to 75% Gold Value", "No Income Proof Needed"],
        "hero_img": "images/loan-gold.jpg",
        "calc_type": "gold",
        "calc_title": "Gold Weight & Sanction Estimator",
        "calc_badge": "30-MIN DISBURSAL",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcGoldGrams">Net Gold Weight (Jewellery/Coins)</label>
                <output id="calcGoldGramsOut">50 grams</output>
              </div>
              <input id="calcGoldGrams" class="calc-range" type="range" min="10" max="500" step="5" value="50">
              <div class="calc-range-limits"><span>10 Grams</span><span>500 Grams</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcGoldGrams" data-val="20">20g</button>
                <button type="button" class="calc-chip active" data-target="calcGoldGrams" data-val="50">50g</button>
                <button type="button" class="calc-chip" data-target="calcGoldGrams" data-val="100">100g</button>
                <button type="button" class="calc-chip" data-target="calcGoldGrams" data-val="250">250g</button>
                <button type="button" class="calc-chip" data-target="calcGoldGrams" data-val="500">500g</button>
              </div>
            </div>

            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcGoldPurity">Purity of Gold</label>
              </div>
              <select id="calcGoldPurity" class="form-control" style="font-weight:700;">
                <option value="6600" selected>22 Karat (Standard Jewellery @ ₹6,600/g)</option>
                <option value="7200">24 Karat (Gold Coins / Bars @ ₹7,200/g)</option>
                <option value="5400">18 Karat (Studded Jewellery @ ₹5,400/g)</option>
              </select>
            </div>
        """,
        "benefits": [
            ("⚡", "30-Minute Disbursal", "Fastest emergency borrowing route with on-the-spot karat testing and cash/NEFT transfer."),
            ("🛡️", "Bank Grade Vault Security", "Pledged jewellery is stored in high-security, tamper-proof, fully insured bank lockers."),
            ("📄", "No Income Proof or ITR", "Credit score or salary slips are not compulsory; sanctioned purely on physical gold appraisal."),
            ("🔄", "Flexible Bullet Repayment", "Pay only monthly interest and clear principal at maturity, or pay regular EMI.")
        ],
        "features": [
            ("💍", "Gold Ornaments & Coins Accepted", "Appraise neck-chains, bangles, rings, and certified bank gold coins up to 50 grams."),
            ("📊", "Maximum 75% RBI LTV", "Enjoy highest permitted valuation based on live daily bullion gold spot rates."),
            ("🔒", "100% Free Insurance", "Your jewellery is fully insured against theft or loss at zero extra charge while under bank custody."),
            ("🏷️", "Flexible Tenure (3 to 36 Months)", "Repay comfortably within 3 months up to 3 years without long lock-ins."),
            ("💳", "Multiple Repayment Modes", "Choose between Bullet Repayment, Monthly Interest-Only, or traditional monthly EMI."),
            ("✨", "Same-Day Release upon Repayment", "Collect your intact sealed jewellery pouch immediately upon settling the loan account.")
        ],
        "eligibility_salaried": ["Age: 18 to 70 years", "Any individual holding gold jewellery (Salaried, Housewives, Students, Seniors)", "Valid Aadhaar / Voter ID / PAN Card", "No CIBIL score minimum"],
        "eligibility_self": ["Age: 18 to 70 years", "Farmers, Traders, Self-Employed and Business owners", "Valid KYC documents", "No ITR or Balance sheet needed"],
        "rate_range": "0.75% – 1.50% per month (9.00% – 18.00% p.a.)",
        "proc_fee": "0.25% – 0.50% (often waived for digital bookings)",
        "foreclosure_fee": "NIL at any time during the tenure",
        "faqs": [
            ("Is my gold safe with the bank?", "Yes. Your gold is weighed, purity-checked in your presence, sealed in a tamper-proof bag with your signature, and stored in an RBI-compliant high-security bank vault with comprehensive insurance."),
            ("What happens if gold prices drop after taking the loan?", "Lenders maintain a 25% safety margin under the 75% LTV rule. If prices drop drastically, you may be requested to deposit additional gold or make a small margin payment."),
            ("What is bullet repayment in a gold loan?", "In bullet repayment, you do not pay any monthly principal or interest during the tenure. You pay the accumulated interest and full principal in one go at the end of the loan term.")
        ],
        "related": [("Personal Loan", "personal-loan.html", "Unsecured borrowing option"), ("Loan Against Property", "loan-against-property.html", "Real estate collateral"), ("Medical Loan", "medical-loan.html", "Healthcare urgent funds")]
    },
    {
        "id": "education",
        "file": "education-loan.html",
        "name": "Education Loan",
        "hero_img": "images/loan-education.jpg",
        "badge1_icon": "🎓",
        "badge1_title": "100% Course Funding",
        "badge1_sub": "India & premier global unis",
        "badge2_icon": "⏳",
        "badge2_title": "Study Moratorium",
        "badge2_sub": "Pay EMIs 1 yr post-study",
        "caption_title": "Finance higher education worldwide",
        "caption_sub": "Tuition fee, accommodation, flight tickets and living costs.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Academic & Global Study Credit",
        "headline": "Invest in Global Ambitions with Study Loans up to ₹1 Crore & Moratorium",
        "description": "Comprehensive student loans up to ₹1 Crore covering 100% tuition, travel, and accommodation for premier universities in India and overseas with repayment starting post-study.",
        "pills": ["Up to ₹1 Crore", "Study in India & Abroad", "Moratorium Repayment", "Tax Deduction Sec 80E"],
        "hero_img": "images/loan-education.jpg",
        "calc_type": "education",
        "calc_title": "Study Loan & Moratorium Estimator",
        "calc_badge": "MORATORIUM BENEFIT",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcAmount">Total Education Funding</label>
                <output id="calcAmountOut">₹25,00,000</output>
              </div>
              <input id="calcAmount" class="calc-range" type="range" min="200000" max="10000000" step="100000" value="2500000">
              <div class="calc-range-limits"><span>₹2 Lakhs</span><span>₹1 Crore</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="1000000">₹10L</button>
                <button type="button" class="calc-chip active" data-target="calcAmount" data-val="2500000">₹25L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="5000000">₹50L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="7500000">₹75L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="10000000">₹1 Cr</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Repayment Tenure</label>
                  <output id="calcTenureOut">10 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="3" max="15" step="1" value="10">
                <div class="calc-range-limits"><span>3 Yrs</span><span>15 Yrs</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label>Study Moratorium</label>
                  <output style="font-size:0.95rem; color:#059669;">Course + 6-12 Mos</output>
                </div>
                <p style="font-size:0.75rem; color:#64748B; margin-top:8px;">Zero principal repayment required while studying.</p>
              </div>
            </div>
        """,
        "benefits": [
            ("🎓", "Course + 1 Yr Moratorium", "No EMI pressure during your college years. Repayment starts 6-12 months post graduation."),
            ("✈️", "Comprehensive Coverage", "Covers tuition fees, flight tickets, campus housing, laptop, books, and living expenses."),
            ("💰", "Collateral-Free up to ₹7.5L", "Unsecured education funding up to ₹7.5 Lakhs for premier Indian institutes."),
            ("📑", "100% Tax Relief (Sec 80E)", "Claim unlimited tax deduction on total interest paid for up to 8 consecutive financial years.")
        ],
        "features": [
            ("🌍", "Global University Acceptance", "Approved across universities in USA, UK, Canada, Germany, Australia, Ireland, and Singapore."),
            ("🤝", "Parent / Guardian Co-Signer", "Parents, legal guardians or spouse act as financial co-applicants."),
            ("💵", "Pre-Visa Disbursement Sanction", "Receive formal loan sanction letter to facilitate your overseas student visa interview."),
            ("📈", "Attractive Student Rates", "Special concession of 0.50% for female scholars at select partner banking institutions."),
            ("🏢", "Direct College Fee Remittance", "Streamlined foreign outward remittance directly to your college bursar account."),
            ("🔄", "Extended 15-Year Repayments", "Long repayment horizons keep monthly student EMIs comfortable after landing your first job.")
        ],
        "eligibility_salaried": ["Indian national with confirmed admission to recognized Indian / overseas university", "Co-applicant (Parent/Guardian/Spouse) with stable salaried income", "Good academic track record in 10th, 12th & Graduation"],
        "eligibility_self": ["Co-applicant with stable business vintage and regular ITR filings", "Clean CIBIL repayment history for co-signer (680+)"],
        "rate_range": "9.25% – 13.50% p.a.",
        "proc_fee": "NIL for Indian studies; up to ₹10,000 for overseas processing",
        "foreclosure_fee": "NIL anytime during tenure",
        "faqs": [
            ("What is an education loan moratorium period?", "A moratorium period is a repayment holiday. It covers your entire academic course duration plus an additional 6 to 12 months grace period to find employment before principal EMIs kick in."),
            ("Can I claim tax deduction under Section 80E?", "Yes! The entire interest component paid on your education loan is eligible for full tax deduction with no upper limit under Section 80E of the Indian Income Tax Act for up to 8 years."),
            ("Does the loan cover living costs abroad?", "Yes. The loan covers tuition fees, library charges, student accommodation, exam fees, travel tickets, medical insurance, and computer purchase.")
        ],
        "related": [("Personal Loan", "personal-loan.html", "Quick academic expenses"), ("Loan Against Property", "loan-against-property.html", "High-value funding for Ivy League"), ("Easy EMI Loan", "easy-emi-loan.html", "Laptop & gadget purchase")]
    },
    {
        "id": "car",
        "file": "car-loan.html",
        "name": "Car Loan",
        "hero_img": "images/loan-vehicle.jpg",
        "badge1_icon": "🚗",
        "badge1_title": "Up to 100% On-Road",
        "badge1_sub": "Zero down payment schemes",
        "badge2_icon": "⏱️",
        "badge2_title": "1-Day Delivery",
        "badge2_sub": "New cars & certified pre-owned",
        "caption_title": "Drive home your dream car this week",
        "caption_sub": "Tie-ups with leading automotive dealerships across India.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Four-Wheeler Automotive Credit",
        "headline": "Drive Your Dream Car with up to 100% On-Road Financing from 8.75% p.a.",
        "description": "Flexible new and pre-owned car financing with zero or minimal down payment, customized tenures up to 7 years, instant digital approvals, and partnerships with leading automakers across India.",
        "pills": ["Rates from 8.75% p.a.", "Up to 100% On-Road", "Tenure up to 7 Yrs", "Instant Dealership Sanction"],
        "hero_img": "images/loan-vehicle.jpg",
        "calc_type": "car",
        "calc_title": "Car Loan & Down Payment Calculator",
        "calc_badge": "100% ON-ROAD OPTIONS",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcVehiclePrice">Car On-Road Price</label>
                <output id="calcVehiclePriceOut">₹12,00,000</output>
              </div>
              <input id="calcVehiclePrice" class="calc-range" type="range" min="300000" max="6000000" step="50000" value="1200000">
              <div class="calc-range-limits"><span>₹3 Lakhs</span><span>₹60 Lakhs</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcVehiclePrice" data-val="600000">₹6L</button>
                <button type="button" class="calc-chip active" data-target="calcVehiclePrice" data-val="1200000">₹12L</button>
                <button type="button" class="calc-chip" data-target="calcVehiclePrice" data-val="1800000">₹18L</button>
                <button type="button" class="calc-chip" data-target="calcVehiclePrice" data-val="3000000">₹30L</button>
                <button type="button" class="calc-chip" data-target="calcVehiclePrice" data-val="5000000">₹50L</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcDownPayment">Down Payment</label>
                  <output id="calcDownPaymentOut">15% (₹1.8L)</output>
                </div>
                <input id="calcDownPayment" class="calc-range" type="range" min="0" max="40" step="5" value="15">
                <div class="calc-range-limits"><span>0% (Zero DP)</span><span>40%</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Tenure</label>
                  <output id="calcTenureOut">5 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="1" max="7" step="1" value="5">
                <div class="calc-range-limits"><span>1 Yr</span><span>7 Yrs</span></div>
              </div>
            </div>
        """,
        "benefits": [
            ("🚗", "Up to 100% On-Road Funding", "Cover registration, road tax, and insurance without dipping into your savings."),
            ("📉", "Attractive Rates from 8.75%", "Fixed interest rate options guarantee unvarying monthly payments throughout."),
            ("🏎️", "New & Pre-Owned Cars", "Financing available for brand-new models as well as certified used vehicles up to 10 years old."),
            ("⚡", "Instant In-Principle Sanction", "Walk into your favorite dealership with a pre-approved loan voucher ready in hand.")
        ],
        "features": [
            ("🤝", "Direct Dealership Integration", "Partnered with Maruti, Hyundai, Tata, Mahindra, Honda, Toyota and luxury automakers."),
            ("⚡", "Minimal Documentation", "Fast paperless underwriting via digital bank statement and PAN verification."),
            ("📅", "Tenures from 1 to 7 Years", "Tailor your repayment tenure to match your vehicle replacement cycle."),
            ("🔄", "Pre-Owned Car Refinancing", "Get funds against your existing paid-off car with quick evaluation."),
            ("🏷️", "Zero Hidden Charges", "Upfront disclosure of documentation and RTO registration fees."),
            ("🛡️", "Comprehensive Bundled Insurance", "Option to fold multi-year comprehensive auto insurance into your EMI.")
        ],
        "eligibility_salaried": ["Age: 21 to 65 years", "Min. Monthly Salary: ₹25,000", "Min. 1 year of total employment", "CIBIL Score: 680+"],
        "eligibility_self": ["Age: 21 to 65 years", "Min 2 years in current business with ITR filing", "Net Annual Income: ₹2.5 Lakhs+", "CIBIL Score: 700+"],
        "rate_range": "8.75% – 12.50% p.a.",
        "proc_fee": "0.50% – 1.00% (or flat ₹3,000 - ₹5,000 + GST)",
        "foreclosure_fee": "2% to 4% after 6 to 12 months",
        "faqs": [
            ("What does 100% on-road financing mean?", "On-road financing covers the car's ex-showroom price plus state road tax, RTO registration charges, and insurance, requiring minimal to zero out-of-pocket cash at delivery."),
            ("Can I buy a used or pre-owned car with Finora?", "Yes. We finance certified used cars up to 10 years of total age with loans up to 85% of evaluated value."),
            ("Can I pay off my car loan early?", "Yes, you can prepay or foreclose your vehicle loan after 6 monthly installments by paying nominal foreclosure fees.")
        ],
        "related": [("Two-Wheeler Loan", "two-wheeler-loan.html", "Bike & Scooter financing"), ("Personal Loan", "personal-loan.html", "Unsecured funds for custom mods"), ("Home Loan", "home-loan.html", "Dream home credit")]
    },
    {
        "id": "twowheeler",
        "file": "two-wheeler-loan.html",
        "name": "Two-Wheeler Loan",
        "hero_img": "images/loan-vehicle.jpg",
        "badge1_icon": "🏍️",
        "badge1_title": "Instant Bike Loan",
        "badge1_sub": "Commuters, sports bikes & EVs",
        "badge2_icon": "⚡",
        "badge2_title": "Zero Down Payment",
        "badge2_sub": "Special subsidies on EVs",
        "caption_title": "Your daily ride with effortless EMIs",
        "caption_sub": "Same-day showroom approval with minimal identity proof.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Motorcycle, Scooter & EV Credit",
        "headline": "Ride Away on Your Dream Bike or EV with Instant Approvals & Easy EMIs",
        "description": "Fast two-wheeler financing up to ₹3.5 Lakhs for commuter bikes, performance motorcycles, and electric scooters with zero down payment options, paperless KYC, and low EMIs.",
        "pills": ["Rates from 9.99% p.a.", "Up to ₹3.5 Lakhs", "Zero Down Payment", "EV Subsidy Supported"],
        "hero_img": "images/loan-vehicle.jpg",
        "calc_type": "twowheeler",
        "calc_title": "Two-Wheeler EMI Estimator",
        "calc_badge": "FAST APPROVAL",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcVehiclePrice">Bike / EV On-Road Price</label>
                <output id="calcVehiclePriceOut">₹1,20,000</output>
              </div>
              <input id="calcVehiclePrice" class="calc-range" type="range" min="40000" max="350000" step="5000" value="120000">
              <div class="calc-range-limits"><span>₹40K</span><span>₹3.5 Lakhs</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcVehiclePrice" data-val="60000">₹60K</button>
                <button type="button" class="calc-chip active" data-target="calcVehiclePrice" data-val="120000">₹1.2L</button>
                <button type="button" class="calc-chip" data-target="calcVehiclePrice" data-val="180000">₹1.8L</button>
                <button type="button" class="calc-chip" data-target="calcVehiclePrice" data-val="250000">₹2.5L</button>
                <button type="button" class="calc-chip" data-target="calcVehiclePrice" data-val="350000">₹3.5L</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcDownPayment">Down Payment</label>
                  <output id="calcDownPaymentOut">10% (₹12,000)</output>
                </div>
                <input id="calcDownPayment" class="calc-range" type="range" min="0" max="30" step="5" value="10">
                <div class="calc-range-limits"><span>0% (Zero DP)</span><span>30%</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Tenure</label>
                  <output id="calcTenureOut">2 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="1" max="4" step="1" value="2">
                <div class="calc-range-limits"><span>1 Yr</span><span>4 Yrs</span></div>
              </div>
            </div>
        """,
        "benefits": [
            ("⚡", "Approval in 10 Minutes", "Spot dealership sanction with quick online Aadhaar and PAN check."),
            ("🛵", "Electric Two-Wheeler Friendly", "Special low rates and government EV subsidy pass-through for electric scooters."),
            ("💳", "Zero Down Payment Schemes", "Drive out with 100% financing on select commuter and executive bikes."),
            ("📅", "Flexible 1-4 Years Tenure", "Bite-sized EMIs as low as ₹1,800/month to keep your daily budget relaxed.")
        ],
        "features": [
            ("🏍️", "Covers All Segments", "Financing for Hero, Honda, Bajaj, TVS, Royal Enfield, Yamaha, Ather, Ola, and Chetak."),
            ("📄", "Minimal Income Paperwork", "Simple bank statement verification for salaried employees and self-employed individuals."),
            ("🏷️", "Pre-Owned Two-Wheelers", "Loans also provided for certified pre-owned super-bikes and performance bikes."),
            ("📱", "UPI Automatic EMIs", "Seamless monthly debit setup via UPI e-mandate or netbanking NACH."),
            ("🛡️", "Helmet & Accessory Financing", "Fold riding gear and insurance costs into your combined loan structure."),
            ("✨", "Fast RTO Hypothecation Removal", "Prompt NOC release upon final EMI settlement so you own the bike 100% cleanly.")
        ],
        "eligibility_salaried": ["Age: 18 to 60 years", "Min. Monthly Income: ₹15,000", "Valid driving license & Aadhaar", "CIBIL Score: 650+"],
        "eligibility_self": ["Age: 18 to 65 years", "Active local business / trade for 1+ years", "Bank statement of last 3 months", "CIBIL Score: 660+"],
        "rate_range": "9.99% – 16.50% p.a.",
        "proc_fee": "Flat ₹1,000 – ₹2,500 + GST",
        "foreclosure_fee": "2% after 6 months",
        "faqs": [
            ("Can I buy an Electric Scooter (EV) with this loan?", "Yes! We offer dedicated EV two-wheeler financing with lower interest rates and assistance in claiming FAME II / PM E-Drive state subsidies."),
            ("Is a driving license required to apply?", "A valid driving license or learner's permit is mandatory for registration under the Motor Vehicles Act."),
            ("What is the minimum down payment required?", "Eligible borrowers with good credit track records can qualify for 100% financing (Zero Down Payment). Others can start with as low as 10% to 15% down payment.")
        ],
        "related": [("Car Loan", "car-loan.html", "Four-wheeler automotive credit"), ("Easy EMI Loan", "easy-emi-loan.html", "Appliance & retail financing"), ("Personal Loan", "personal-loan.html", "Cash personal credit")]
    },
    {
        "id": "medical",
        "file": "medical-loan.html",
        "name": "Medical Loan",
        "hero_img": "images/purpose-medical.jpg",
        "badge1_icon": "🩺",
        "badge1_title": "4-Hr Priority Disbursal",
        "badge1_sub": "Emergency hospitalization",
        "badge2_icon": "💳",
        "badge2_title": "Zero Foreclosure Fee",
        "badge2_sub": "Preclose without penalty",
        "caption_title": "Caring financial support for health needs",
        "caption_sub": "Transparent medical loans so patient health always comes first.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Emergency Healthcare Financing",
        "headline": "Immediate Medical Emergency Financing up to ₹25 Lakhs with Zero Prepayment Fees",
        "description": "Urgent healthcare loans with immediate hospital/bank disbursal, zero prepayment penalties, minimal documentation, and flexible repayment tenures for surgeries, treatments, and procedures.",
        "pills": ["Disbursal in 4 Hours", "Up to ₹25 Lakhs", "Zero Prepayment Fees", "Covers Non-Insured Costs"],
        "hero_img": "images/loan-medical.jpg",
        "calc_type": "medical",
        "calc_title": "Healthcare EMI Planner",
        "calc_badge": "EMERGENCY SANCTION",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcAmount">Medical Treatment Cost</label>
                <output id="calcAmountOut">₹4,00,000</output>
              </div>
              <input id="calcAmount" class="calc-range" type="range" min="50000" max="2500000" step="25000" value="400000">
              <div class="calc-range-limits"><span>₹50K</span><span>₹25 Lakhs</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="100000">₹1L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="250000">₹2.5L</button>
                <button type="button" class="calc-chip active" data-target="calcAmount" data-val="400000">₹4L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="1000000">₹10L</button>
                <button type="button" class="calc-chip" data-target="calcAmount" data-val="2500000">₹25L</button>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcTenure">Tenure</label>
                  <output id="calcTenureOut">2 years</output>
                </div>
                <input id="calcTenure" class="calc-range" type="range" min="1" max="3" step="1" value="2">
                <div class="calc-range-limits"><span>1 Yr</span><span>3 Yrs</span></div>
              </div>
              <div class="calc-group">
                <div class="calc-label-row">
                  <label for="calcRate">Interest Rate</label>
                  <output id="calcRateOut">10.99%</output>
                </div>
                <input id="calcRate" class="calc-range" type="range" min="10.99" max="18" step="0.25" value="10.99">
                <div class="calc-range-limits"><span>10.99%</span><span>18%</span></div>
              </div>
            </div>
        """,
        "benefits": [
            ("🏥", "Same-Day Hospital Credit", "Direct settlement or transfer into your account within 4 to 12 hours of urgent application."),
            ("🔓", "Zero Prepayment Penalty", "Close the loan anytime without penalty once insurance claims or mediclaim reimbursements arrive."),
            ("💊", "Covers Non-Insured Expenses", "Fund robotic surgeries, dental implants, IVF, cosmetic procedures, and pre/post-hospital care."),
            ("📄", "Minimal Documentation", "Prioritized emergency underwriting requiring just basic identity and bank statement.")
        ],
        "features": [
            ("⚡", "Priority Emergency Desk", "Dedicated priority processing desk to ensure medical procedures are never delayed."),
            ("👨‍👩‍👧", "Covers Family Members", "Borrow funds for self, spouse, parents, children, or dependent siblings."),
            ("💰", "Loan Quantum up to ₹25 Lakhs", "Sufficient headroom for cardiac care, oncology, organ transplants, and prolonged ICU recovery."),
            ("🛡️", "No Collateral or Asset Hypothecation", "Completely unsecured financing based on household income."),
            ("📉", "Competitive Interest Rates", "Special concession rates starting at 10.99% p.a."),
            ("💳", "Insurance Settlement Flexibility", "Use the medical loan to clear hospital bills upfront, and repay instantly when your mediclaim insurer reimburses.")
        ],
        "eligibility_salaried": ["Age: 21 to 65 years", "Min. Monthly Salary: ₹20,000", "Hospital estimate / admission record", "CIBIL Score: 650+"],
        "eligibility_self": ["Age: 21 to 68 years", "Self-employed / Business income proof", "Hospital estimate document", "CIBIL Score: 660+"],
        "rate_range": "10.99% – 17.50% p.a.",
        "proc_fee": "1.00% (discounted for emergency healthcare)",
        "foreclosure_fee": "ZERO foreclosure charge after 30 days",
        "faqs": [
            ("Can I pay off the medical loan once my health insurance pays out?", "Yes! Our medical loans feature zero foreclosure penalty, so you can settle the full balance the moment your health insurance claim is approved."),
            ("What medical treatments can be funded?", "All surgeries, critical illnesses, dental treatments, maternity care, IVF/fertility cycles, rehabilitation, chemotherapy, and cosmetic surgeries not covered by traditional mediclaim policies."),
            ("How quickly are medical loan funds released?", "Emergency applications are reviewed under accelerated underwriting, with fund transfers completed within 4 to 12 hours.")
        ],
        "related": [("Personal Loan", "personal-loan.html", "General purpose funding"), ("Insta Personal Loan", "insta-personal-loan.html", "15-minute digital approval"), ("Gold Loan", "gold-loan.html", "Instant cash against gold")]
    },
    {
        "id": "securities",
        "file": "loan-against-securities.html",
        "name": "Loan Against Securities",
        "hero_img": "images/loan-securities.jpg",
        "badge1_icon": "📈",
        "badge1_title": "Zero Share Selling",
        "badge1_sub": "Stay invested in market growth",
        "badge2_icon": "💰",
        "badge2_title": "Pay Only on Drawn",
        "badge2_sub": "Revolving overdraft line",
        "caption_title": "Liquidity against Mutual Funds & Equities",
        "caption_sub": "Pledge demat holdings digitally and draw credit anytime.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Portfolio Backed Credit Line",
        "headline": "Instant Overdraft Credit Line Without Selling Your Stocks or Mutual Funds",
        "description": "Unlock immediate liquidity up to ₹2 Crore by creating a digital lien on your equity shares, mutual funds, and bonds. Retain 100% of dividends and pay interest only on what you withdraw.",
        "pills": ["Up to ₹2 Crore", "Overdraft Facility", "Retain Capital Growth", "Pay Interest on Used Funds"],
        "hero_img": "images/loan-securities.jpg",
        "calc_type": "securities",
        "calc_title": "Portfolio Overdraft Estimator",
        "calc_badge": "REVOLVING CREDIT",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcPortfolio">Total Portfolio Value (Shares & Mutual Funds)</label>
                <output id="calcPortfolioOut">₹20,00,000</output>
              </div>
              <input id="calcPortfolio" class="calc-range" type="range" min="100000" max="20000000" step="100000" value="2000000">
              <div class="calc-range-limits"><span>₹1 Lakh</span><span>₹2 Crore</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcPortfolio" data-val="500000">₹5L</button>
                <button type="button" class="calc-chip active" data-target="calcPortfolio" data-val="2000000">₹20L</button>
                <button type="button" class="calc-chip" data-target="calcPortfolio" data-val="5000000">₹50L</button>
                <button type="button" class="calc-chip" data-target="calcPortfolio" data-val="10000000">₹1 Cr</button>
                <button type="button" class="calc-chip" data-target="calcPortfolio" data-val="20000000">₹2 Cr</button>
              </div>
            </div>

            <div class="calc-result-box" style="margin-top:20px;">
              <div class="calc-emi-headline">
                <small>Approved Overdraft Credit Limit (70% LTV)</small>
                <div class="calc-emi-val" id="calcEmiOut">₹14,00,000</div>
              </div>
              <div class="calc-submetrics">
                <div class="calc-submetric">
                  <small>Interest Basis</small>
                  <strong id="calcTotalInterest">₹750 / mo per ₹1L drawn</strong>
                </div>
                <div class="calc-submetric">
                  <small>Principal Obligation</small>
                  <strong id="calcTotalPayment">Interest only on drawn amount</strong>
                </div>
              </div>
              <a href="#applyModal" class="btn btn-primary calc-apply-btn" data-open-modal data-product="Loan Against Securities">Activate Overdraft Limit ↗</a>
              <p class="calc-disclaimer">Zero interest charged when line balance is zero. Approved securities list applies.</p>
            </div>
        """,
        "benefits": [
            ("📈", "Never Sell in a Down Market", "Avoid distress-selling your long-term wealth assets during market corrections."),
            ("💸", "Interest Only on Usage", "If your limit is ₹20 Lakhs and you use ₹2 Lakhs for 15 days, pay interest only on ₹2 Lakhs for 15 days."),
            ("🎁", "Keep Earning Dividends", "100% of dividends, bonus shares, and market appreciation remain yours."),
            ("⚡", "Digital Lien in 2 Hours", "Seamless online lien marking through NSDL, CDSL, CAMS, and KFintech.")
        ],
        "features": [
            ("📊", "Approved List of 1,000+ Stocks & Funds", "Pledge large-cap, mid-cap equities, debt mutual funds, sovereign gold bonds (SGB), and tax-free bonds."),
            ("🔄", "Revolving Overdraft Architecture", "Deposit surplus cash anytime to zero out interest, and withdraw again whenever an opportunity arises."),
            ("📉", "Attractive Interest Rates from 9.00% p.a.", "Lower borrowing cost than unsecured credit cards and personal loans."),
            ("📱", "Linked ATM / Net-Banking Limit", "Access your approved limit via online transfers, UPI, or linked current account debit card."),
            ("🛡️", "No Prepayment or Foreclosure Fees", "Zero penalty for closing or zeroing the overdraft facility at any time."),
            ("⚡", "Instant Unpledge", "Release lien on your shares within 24 hours of clearing dues.")
        ],
        "eligibility_salaried": ["Age: 21 to 70 years", "Demat account with NSDL or CDSL holding approved securities", "Valid PAN and Aadhaar", "Min. portfolio value: ₹1,00,000"],
        "eligibility_self": ["Resident Indian, HUF, or Corporate holding eligible equity/mutual fund investments", "Valid PAN card linked to Demat portfolio"],
        "rate_range": "9.00% – 11.50% p.a. (Calculated daily on utilized balance)",
        "proc_fee": "Flat ₹1,500 – ₹3,500 + Demat pledge creation charges",
        "foreclosure_fee": "NIL at any time",
        "faqs": [
            ("Do I lose ownership of my shares or mutual funds?", "No. The securities remain registered in your Demat account. A lien is marked in favor of the lender, but all dividend payouts, voting rights, and market gains stay 100% yours."),
            ("How is interest calculated on Loan Against Securities?", "Interest is calculated on a daily reducing balance only on the exact amount you withdraw from your overdraft account, not on the total sanctioned limit."),
            ("What happens if my stock value falls?", "If the market price drops below the required margin, you will be notified to either pledge additional shares, pay down a small portion of the limit, or adjust the balance.")
        ],
        "related": [("Business Loan", "business-loan.html", "Unsecured business capital"), ("Loan Against Property", "loan-against-property.html", "Real estate collateral"), ("Gold Loan", "gold-loan.html", "Instant gold loan")]
    },
    {
        "id": "consolidation",
        "file": "debt-consolidation-loan.html",
        "name": "Debt Consolidation Loan",
        "hero_img": "images/loan-consolidation.jpg",
        "badge1_icon": "✂️",
        "badge1_title": "Save up to 40% EMI",
        "badge1_sub": "Combine high-interest dues",
        "badge2_icon": "🛡️",
        "badge2_title": "Single Monthly Due",
        "badge2_sub": "Rebuild your credit health",
        "caption_title": "Break free from multi-debt stress",
        "caption_sub": "One unified loan at lower interest to clear credit cards and debts.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Structured Liability Management",
        "headline": "Merge Multiple High-Interest Debts into a Single Lower Monthly Payment",
        "description": "Combine multiple credit card balances and high-interest personal loans into a single consolidated Finora loan with lower interest rates, reducing monthly payments by up to 40%.",
        "pills": ["Reduce EMIs by up to 40%", "Single Monthly Due Date", "Boost CIBIL Score", "Tenure up to 5 Yrs"],
        "hero_img": "images/loan-consolidation.jpg",
        "calc_type": "consolidation",
        "calc_title": "Debt Consolidation & Savings Estimator",
        "calc_badge": "DEBT RESTRUCTURING",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcCardDebt">Credit Card Outstanding (Avg 40% APR)</label>
                <output id="calcCardDebtOut">₹2,00,000</output>
              </div>
              <input id="calcCardDebt" class="calc-range" type="range" min="0" max="1500000" step="25000" value="200000">
              <div class="calc-range-limits"><span>₹0</span><span>₹15 Lakhs</span></div>
            </div>

            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcPlDebt">Existing High-Rate Personal Loans</label>
                <output id="calcPlDebtOut">₹4,00,000</output>
              </div>
              <input id="calcPlDebt" class="calc-range" type="range" min="0" max="2500000" step="50000" value="400000">
              <div class="calc-range-limits"><span>₹0</span><span>₹25 Lakhs</span></div>
            </div>

            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcTenure">Desired New Loan Tenure</label>
                <output id="calcTenureOut">3 years</output>
              </div>
              <input id="calcTenure" class="calc-range" type="range" min="1" max="5" step="1" value="3">
              <div class="calc-range-limits"><span>1 Yr</span><span>5 Yrs</span></div>
            </div>
        """,
        "benefits": [
            ("📉", "Save up to 40% Monthly", "Cut down expensive 42% credit card finance charges to clean 10.99% personal loan rates."),
            ("📅", "One Single Monthly Payment", "Replace 4 or 5 confusing billing cycles with a single, predictable auto-debit date."),
            ("📈", "Rapid CIBIL Recovery", "Lowering your credit card credit-utilization-ratio (CUR) triggers an immediate credit score jump."),
            ("🧘", "End Collection Stress", "Pay off harassing multi-creditor dues and regain complete control over your monthly budget.")
        ],
        "features": [
            ("🔄", "Direct Creditor Payouts", "Option for Finora to disburse funds directly to your credit card issuers and lenders to ensure clean closure."),
            ("💰", "Consolidate up to ₹40 Lakhs", "Sufficient headroom to package multiple loans and credit cards into one structured facility."),
            ("📊", "Fixed Monthly Budgeting", "Clear countdown to debt freedom with transparent amortization schedule."),
            ("🛑", "Stop Compounding Interest Traps", "Escape minimum-amount-due credit card traps that take 15+ years to clear."),
            ("🔐", "Zero Collateral Required", "Unsecured consolidation based on current income and verified willingness to clear past debt."),
            ("🤝", "Free Debt Advisory Review", "Complimentary consultation with a senior Finora credit advisor to structure your debt repayment.")
        ],
        "eligibility_salaried": ["Age: 21 to 60 years", "Min. Take-Home Salary: ₹25,000/month", "Existing credit cards or loans in active standard standing", "CIBIL Score: 640+ (cases with high utilization welcomed)"],
        "eligibility_self": ["Age: 23 to 65 years", "Self-employed professional or business owner with stable income", "Latest 1 year banking statement", "CIBIL Score: 650+"],
        "rate_range": "10.99% – 16.50% p.a.",
        "proc_fee": "1.00% – 1.50% of consolidated amount",
        "foreclosure_fee": "NIL after 12 months",
        "faqs": [
            ("How does debt consolidation improve my credit score?", "When you pay off credit cards with a personal loan, your revolving credit utilization drops to 0%, which typically increases your CIBIL score within 30 to 60 days."),
            ("Will Finora pay my old credit card banks directly?", "Yes, we can disburse the sanctioned amount directly to your credit card accounts and existing lenders, obtaining No-Dues Certificates on your behalf."),
            ("Can I consolidate if my credit score has already dropped slightly?", "Yes. We specialize in working with borrowers whose scores have dipped due to high credit card utilization (above 70%), helping restore financial stability.")
        ],
        "related": [("Personal Loan", "personal-loan.html", "Standard personal financing"), ("Insta Personal Loan", "insta-personal-loan.html", "Fast 15-minute disbursement"), ("Loan Against Property", "loan-against-property.html", "Low-cost debt consolidation")]
    },
    {
        "id": "easyemi",
        "file": "easy-emi-loan.html",
        "name": "Easy EMI Loan",
        "hero_img": "images/loan-easyemi.jpg",
        "badge1_icon": "🏷️",
        "badge1_title": "0% No-Cost EMI",
        "badge1_sub": "Electronics, gadgets & lifestyle",
        "badge2_icon": "⚡",
        "badge2_title": "Instant Store Checkout",
        "badge2_sub": "5,000+ merchant partner outlets",
        "caption_title": "Shop your favourite products in easy parts",
        "caption_sub": "Divide retail purchases into 3, 6, 9 or 12 convenient monthly parts.",
        "self_avatar": "images/profile-doctor.jpg",
        "category": "Consumer & Retail Checkout Financing",
        "headline": "Buy Now and Pay in Convenient Monthly Installments up to ₹5 Lakhs",
        "description": "Convert consumer electronics, home appliances, smartphones, travel bookings, and lifestyle purchases into affordable No-Cost and Low-Cost EMIs over 3 to 24 months.",
        "pills": ["Up to ₹5 Lakhs", "No-Cost EMI Options", "Instant Digital Approval", "Zero Down Payment"],
        "hero_img": "images/loan-easyemi.jpg",
        "calc_type": "easyemi",
        "calc_title": "Easy EMI Ticket Estimator",
        "calc_badge": "FLEXIBLE CHECKOUT",
        "calc_fields": """
            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcTicket">Purchase Ticket Size</label>
                <output id="calcTicketOut">₹75,000</output>
              </div>
              <input id="calcTicket" class="calc-range" type="range" min="10000" max="500000" step="5000" value="75000">
              <div class="calc-range-limits"><span>₹10,000</span><span>₹5 Lakhs</span></div>
              <div class="calc-chips">
                <button type="button" class="calc-chip" data-target="calcTicket" data-val="25000">₹25K</button>
                <button type="button" class="calc-chip active" data-target="calcTicket" data-val="75000">₹75K</button>
                <button type="button" class="calc-chip" data-target="calcTicket" data-val="150000">₹1.5L</button>
                <button type="button" class="calc-chip" data-target="calcTicket" data-val="300000">₹3L</button>
                <button type="button" class="calc-chip" data-target="calcTicket" data-val="500000">₹5L</button>
              </div>
            </div>

            <div class="calc-group">
              <div class="calc-label-row">
                <label for="calcTenure">Repayment Tenure</label>
                <output id="calcTenureOut">6 months</output>
              </div>
              <input id="calcTenure" class="calc-range" type="range" min="3" max="24" step="3" value="6">
              <div class="calc-range-limits"><span>3 Mos (0% No-Cost)</span><span>24 Mos</span></div>
            </div>
        """,
        "benefits": [
            ("🛍️", "0% No-Cost EMI", "Enjoy true zero-interest installments on 3 to 6-month tenures across partner brands."),
            ("⚡", "Instant Digital Sanction", "Pre-approved checkout limit verified in under 60 seconds with your mobile number."),
            ("📱", "Zero Credit Card Needed", "Shop on EMI using your regular savings bank debit card or UPI auto-pay mandate."),
            ("💸", "Zero Down Payment", "Take your purchase home today with 100% upfront financing.")
        ],
        "features": [
            ("📺", "Electronics, Appliances & Gadgets", "Finance iPhones, laptops, 4K Smart TVs, air conditioners, and modular furniture."),
            ("🏖️", "Travel & Vacation Packages", "Split flight tickets and luxury resort bookings into manageable monthly EMIs."),
            ("💳", "Pre-Set Reusable Limit", "Once approved, use your Finora Easy EMI limit across 5,000+ online and offline merchant partners."),
            ("🔄", "Automated Monthly Deductions", "Set-and-forget monthly debits via UPI autopay or e-NACH mandate."),
            ("🛡️", "No Security Deposit", "Unsecured consumer retail loan with zero collateral."),
            ("✨", "Build Credit History", "Timely repayment of small-ticket consumer loans is the fastest way to build a high CIBIL score.")
        ],
        "eligibility_salaried": ["Age: 18 to 60 years", "Min. Monthly Income: ₹15,000", "Valid Aadhaar and PAN Card", "CIBIL Score: 640+ (first-time borrowers with no history eligible)"],
        "eligibility_self": ["Age: 18 to 65 years", "Active bank account with regular UPI/credit transactions", "Valid KYC documents"],
        "rate_range": "0% (No-Cost EMI) to 14.00% p.a. on longer tenures",
        "proc_fee": "Flat ₹199 – ₹799 depending on ticket size",
        "foreclosure_fee": "NIL at any time",
        "faqs": [
            ("How does a No-Cost EMI work?", "In a No-Cost EMI, the merchant or brand provides an upfront discount equivalent to the total interest charge, so you pay exactly the product price split across monthly installments with zero extra interest."),
            ("Do I need a credit card to use Easy EMI?", "No! Finora Easy EMI works with your regular savings bank account via UPI autopay or debit card mandate."),
            ("Can I buy multiple items under my approved limit?", "Yes! Your approved limit can be used across multiple purchases as long as your total outstanding remains within your sanctioned ceiling.")
        ],
        "related": [("Two-Wheeler Loan", "two-wheeler-loan.html", "Bike & EV financing"), ("Insta Personal Loan", "insta-personal-loan.html", "15-minute cash loan"), ("Personal Loan", "personal-loan.html", "Higher cash loan up to ₹40L")]
    }
]

def get_header(active_loan_name=""):
    return f'''  <!-- Top Bar -->
  <div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-left">
        <span class="topbar-badge">VERIFIED RATES</span>
        <span>Simple finance. Clear next steps.</span>
      </div>
      <div class="top-secondary">
        <span>Need help? <a href="index.html#contact">Talk to our support team ↗</a></span>
      </div>
    </div>
  </div>

  <!-- Header Navigation with Loans Mega Menu -->
  <header>
    <div class="container nav-wrap">
      <a class="brand" href="index.html" aria-label="Finora home">
        <img src="images/finora-logo-trimmed.png?v=2" alt="Finora Loan - Financing a Brighter Tomorrow" class="brand-logo" width="175" height="50">
      </a>
      
      <nav class="nav-links" id="mainNav" aria-label="Main navigation">
        <div class="nav-item has-mega">
          <a href="index.html#loans" class="nav-link-dropdown" aria-haspopup="true" aria-expanded="false">
            Loans <span class="nav-arrow">▾</span>
          </a>
          <div class="mega-menu" role="region" aria-label="Loans categories">
            <div class="mega-container">
              <div class="mega-col">
                <h4 class="mega-col-title">Personal & Consumer</h4>
                <ul class="mega-list">
                  <li>
                    <a href="personal-loan.html">
                      <strong>Personal Loan</strong>
                      <span>Instant funds up to ₹40 Lakhs</span>
                    </a>
                  </li>
                  <li>
                    <a href="insta-personal-loan.html">
                      <strong>Insta Personal Loan</strong>
                      <span>100% digital & paperless approval</span>
                    </a>
                  </li>
                  <li>
                    <a href="medical-loan.html">
                      <strong>Medical Loan</strong>
                      <span>Emergency healthcare financing</span>
                    </a>
                  </li>
                  <li>
                    <a href="debt-consolidation-loan.html">
                      <strong>Debt Consolidation</strong>
                      <span>Combine multi-debt into single EMI</span>
                    </a>
                  </li>
                  <li>
                    <a href="easy-emi-loan.html">
                      <strong>Easy EMI Loan</strong>
                      <span>Flexible split payment options</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div class="mega-col">
                <h4 class="mega-col-title">Home & Property</h4>
                <ul class="mega-list">
                  <li>
                    <a href="home-loan.html">
                      <strong>Home Loan</strong>
                      <span>Lowest APR starting 8.40% p.a.</span>
                    </a>
                  </li>
                  <li>
                    <a href="loan-against-property.html">
                      <strong>Loan Against Property</strong>
                      <span>High loan amount up to 70% LTV</span>
                    </a>
                  </li>
                </ul>

                <h4 class="mega-col-title" style="margin-top:20px;">Vehicle Financing</h4>
                <ul class="mega-list">
                  <li>
                    <a href="car-loan.html">
                      <strong>Car Loan</strong>
                      <span>Up to 100% on-road financing</span>
                    </a>
                  </li>
                  <li>
                    <a href="two-wheeler-loan.html">
                      <strong>Two-Wheeler Loan</strong>
                      <span>Instant approval for bikes & EVs</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div class="mega-col">
                <h4 class="mega-col-title">Business & Wealth</h4>
                <ul class="mega-list">
                  <li>
                    <a href="business-loan.html">
                      <strong>Business Loan</strong>
                      <span>Collateral-free working capital</span>
                    </a>
                  </li>
                  <li>
                    <a href="gold-loan.html">
                      <strong>Gold Loan</strong>
                      <span>Instant cash against gold from 0.75%/mo</span>
                    </a>
                  </li>
                  <li>
                    <a href="education-loan.html">
                      <strong>Education Loan</strong>
                      <span>Fund studies in India & Abroad</span>
                    </a>
                  </li>
                  <li>
                    <a href="loan-against-securities.html">
                      <strong>Loan Against Securities</strong>
                      <span>Overdraft against shares & mutual funds</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div class="mega-col mega-feature-col">
                <div class="mega-feature-card">
                  <small class="feature-badge">NEED GUIDANCE?</small>
                  <h4>Compare all 13 loan products</h4>
                  <p>Check transparent interest rates, tenure limits and find the financing that fits your goals.</p>
                  <a href="index.html#loans" class="btn btn-primary btn-small">View All Loans →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="index.html#investment">Investment</a>
        <a href="index.html#calculators">Calculators</a>
        <a href="index.html#rates">Interest rates</a>
        <a href="index.html#locations">Locations</a>
        <a href="index.html#guides">Guides</a>
      </nav>

      <div class="nav-actions">
        <a class="btn btn-primary btn-small" href="#applyModal" data-open-modal data-product="{active_loan_name or 'Personal Loan'}">
          Check eligibility <span>↗</span>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
      </div>
    </div>
  </header>'''

def get_footer():
    return '''  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <img src="images/finora-logo-trimmed.png?v=2" alt="Finora Loan" class="footer-logo" width="160" height="46">
          <p style="color:#CBD5E1; font-size:0.92rem; line-height:1.55; margin-top:14px; max-width:320px;">
            Finora is a modern Indian financial services platform empowering individuals and enterprises with transparent, verified borrowing solutions.
          </p>
        </div>

        <div>
          <h4>Personal Financing</h4>
          <div class="footer-links">
            <a href="personal-loan.html">Personal Loan</a>
            <a href="insta-personal-loan.html">Insta Personal Loan</a>
            <a href="medical-loan.html">Medical Loan</a>
            <a href="debt-consolidation-loan.html">Debt Consolidation</a>
            <a href="easy-emi-loan.html">Easy EMI Loan</a>
          </div>
        </div>

        <div>
          <h4>Property & Asset Loans</h4>
          <div class="footer-links">
            <a href="home-loan.html">Home Loan</a>
            <a href="loan-against-property.html">Loan Against Property</a>
            <a href="gold-loan.html">Gold Loan</a>
            <a href="loan-against-securities.html">Loan Against Securities</a>
          </div>
        </div>

        <div>
          <h4>Commercial & Vehicle</h4>
          <div class="footer-links">
            <a href="business-loan.html">Business Loan</a>
            <a href="car-loan.html">Car Loan</a>
            <a href="two-wheeler-loan.html">Two-Wheeler Loan</a>
            <a href="education-loan.html">Education Loan</a>
          </div>
        </div>

        <div>
          <h4>Tools & Support</h4>
          <div class="footer-links">
            <a href="index.html#calculators">EMI Calculator</a>
            <a href="index.html#rates">Interest Rate Table</a>
            <a href="index.html#guides">Finance Guides</a>
            <a href="index.html#contact">Contact Support</a>
            <a href="index.html#locations">Branch Locations</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 Finora Financial Services Ltd. All rights reserved.</span>
        <div style="display:flex; gap:16px;">
          <a href="#disclaimer">Privacy Policy</a>
          <a href="#disclaimer">Terms of Service</a>
          <a href="#disclaimer">Grievance Redressal</a>
          <a href="#disclaimer">RBI Fair Practices Code</a>
        </div>
      </div>

      <p class="disclaimer" id="disclaimer">
        Disclaimer: Finora is an independent digital loan comparison and information platform. Interest rates, loan eligibility, processing fees and approval terms are subject to borrower verification and partner lender credit policies. Calculating illustrative EMIs does not constitute an offer of credit or a loan guarantee.
      </p>
    </div>
  </footer>

  <!-- Quick Apply Modal Drawer -->
  <div class="apply-modal" id="applyModal" role="dialog" aria-modal="true" aria-labelledby="modalProductTitle">
    <div class="modal-dialog">
      <div class="modal-head">
        <h3 id="modalProductTitle">Apply for Finora Loan</h3>
        <p>Complete this quick 60-second enquiry to check estimated eligibility.</p>
        <button class="modal-close-btn" data-close-modal aria-label="Close dialog">✕</button>
      </div>
      <div class="modal-body">
        <form id="quickApplyForm">
          <div class="form-grid-2">
            <div class="form-group">
              <label for="applyFullName">Full Name (as per PAN)</label>
              <input type="text" id="applyFullName" class="form-control" placeholder="e.g. Rahul Sharma" required>
            </div>
            <div class="form-group">
              <label for="applyMobile">Mobile Number</label>
              <input type="tel" id="applyMobile" class="form-control" placeholder="98765 43210" pattern="[0-9]{10}" required>
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label for="applyCity">City</label>
              <input type="text" id="applyCity" class="form-control" placeholder="e.g. Mumbai, Delhi, Bengaluru" required>
            </div>
            <div class="form-group">
              <label for="applyIncome">Monthly Net Income</label>
              <input type="number" id="applyIncome" class="form-control" placeholder="₹ per month" min="15000" required>
            </div>
          </div>

          <div class="form-group">
            <label for="applyEmployment">Employment Type</label>
            <select id="applyEmployment" class="form-control" required>
              <option value="salaried">Salaried (Private / Govt)</option>
              <option value="self_employed_pro">Self-Employed Professional (Doctor, CA, etc.)</option>
              <option value="business_owner">Business Owner / Trader</option>
              <option value="other">Other / Freelancer</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:8px;">Check Approval & Connect ↗</button>
          <p style="font-size:0.72rem; color:var(--slate-400); margin-top:10px; text-align:center;">By proceeding, you consent to our privacy policy and credit assessment contact.</p>
        </form>

        <div class="modal-success-screen" id="modalSuccessScreen">
          <div class="success-icon-ring">✓</div>
          <h3 style="color:#0A1C3E; font-size:1.35rem; margin-bottom:8px;">Eligibility Enquiry Received!</h3>
          <p style="color:#475569; font-size:0.92rem; line-height:1.5;">Based on your income profile, you are tentatively eligible for preliminary offers. A Finora relationship advisor will reach out via phone/SMS shortly to assist with verified lender quotes.</p>
          <button type="button" class="btn btn-outline btn-small" data-close-modal style="margin-top:14px;">Close window</button>
        </div>
      </div>
    </div>
  </div>'''

def generate_product_page(prod):
    hero_img = prod["hero_img"]
    related_html = "".join([f"""
          <article class="product-card">
            <div class="product-card-body">
              <h3>{r[0]}</h3>
              <p>{r[2]}</p>
              <div class="product-card-footer">
                <a class="text-link" href="{r[1]}">View details →</a>
              </div>
            </div>
          </article>""" for r in prod["related"]])

    benefits_html = "".join([f"""
        <div class="benefit-card">
          <div class="benefit-icon">{b[0]}</div>
          <div>
            <strong>{b[1]}</strong>
            <p>{b[2]}</p>
          </div>
        </div>""" for b in prod["benefits"]])

    features_html = "".join([f"""
        <div class="feature-box">
          <div class="feature-box-icon">{f[0]}</div>
          <h3>{f[1]}</h3>
          <p>{f[2]}</p>
        </div>""" for f in prod["features"]])

    salaried_html = "".join([f"""
              <li><span class="check-icon">✓</span> <span>{crit}</span></li>""" for crit in prod["eligibility_salaried"]])

    self_html = "".join([f"""
              <li><span class="check-icon">✓</span> <span>{crit}</span></li>""" for crit in prod["eligibility_self"]])

    purposes_html = ""
    subnav_purposes = ""
    if prod.get("has_purposes", False):
        purposes_html = """
    <!-- Personal Loan Life Goals / Purposes Photographic Showcase -->
    <section class="purpose-section" id="purposes">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Infinite Possibilities</span>
          <h2>Finora Personal Loan for <span class="text-gradient-blue">all your life milestones</span></h2>
          <p>No end-use restrictions. Whether planned celebrations or unforeseen moments, finance your aspirations with zero collateral.</p>
        </div>

        <div class="purpose-grid">
          <div class="purpose-card">
            <div class="purpose-img-wrap">
              <img src="images/purpose-wedding.jpg" alt="Wedding & Family Celebrations Personal Loan" loading="lazy">
              <span class="purpose-badge">Up to ₹40 Lakhs</span>
            </div>
            <div class="purpose-body">
              <h3>Wedding & Celebrations</h3>
              <p>Cover luxury banquet bookings, designer attire, gold jewellery, catering, and guest accommodation without exhausting long-term investments.</p>
              <a href="#applyModal" data-open-modal data-product="Personal Loan (Wedding)" class="purpose-link">Apply for Wedding Loan →</a>
            </div>
          </div>

          <div class="purpose-card">
            <div class="purpose-img-wrap">
              <img src="images/purpose-renovation.jpg" alt="Home Renovation Personal Loan" loading="lazy">
              <span class="purpose-badge">Instant Transfer</span>
            </div>
            <div class="purpose-body">
              <h3>Home Makeover & Interiors</h3>
              <p>Redesign your modular kitchen, upgrade luxury living room furniture, install smart electronics, or fund home expansion projects with ease.</p>
              <a href="#applyModal" data-open-modal data-product="Personal Loan (Renovation)" class="purpose-link">Apply for Home Makeover →</a>
            </div>
          </div>

          <div class="purpose-card">
            <div class="purpose-img-wrap">
              <img src="images/hero-couple.jpg" alt="Dream Holiday & Travel Personal Loan" loading="lazy">
              <span class="purpose-badge">Flexible EMIs</span>
            </div>
            <div class="purpose-body">
              <h3>Dream Vacations & Travel</h3>
              <p>Explore international travel destinations in Europe or Southeast Asia, book luxury flights and hotels with pocket-friendly repayment schedules.</p>
              <a href="#applyModal" data-open-modal data-product="Personal Loan (Travel)" class="purpose-link">Apply for Travel Loan →</a>
            </div>
          </div>

          <div class="purpose-card">
            <div class="purpose-img-wrap">
              <img src="images/purpose-medical.jpg" alt="Medical Emergency Personal Loan" loading="lazy">
              <span class="purpose-badge">2-Hour Disbursal</span>
            </div>
            <div class="purpose-body">
              <h3>Medical & Family Health</h3>
              <p>Handle unexpected surgeries, specialized therapies, and family hospital bills immediately with fast-track digital approval and zero foreclosure fees.</p>
              <a href="#applyModal" data-open-modal data-product="Personal Loan (Medical)" class="purpose-link">Apply for Medical Loan →</a>
            </div>
          </div>

          <div class="purpose-card">
            <div class="purpose-img-wrap">
              <img src="images/loan-consolidation.jpg" alt="Credit Card & Debt Consolidation" loading="lazy">
              <span class="purpose-badge">Save up to 40% EMI</span>
            </div>
            <div class="purpose-body">
              <h3>Debt & Card Consolidation</h3>
              <p>Merge multiple high-interest credit card balances and scattered micro-loans into one consolidated low-rate monthly installment to save interest.</p>
              <a href="#applyModal" data-open-modal data-product="Debt Consolidation Loan" class="purpose-link">Consolidate High Dues →</a>
            </div>
          </div>

          <div class="purpose-card">
            <div class="purpose-img-wrap">
              <img src="images/loan-education.jpg" alt="Higher Education & Professional Upskilling" loading="lazy">
              <span class="purpose-badge">Zero Collateral</span>
            </div>
            <div class="purpose-body">
              <h3>Higher Education & Upskilling</h3>
              <p>Finance executive MBA programs, international certifications, technical bootcamps, and professional career transitions with manageable EMIs.</p>
              <a href="#applyModal" data-open-modal data-product="Personal Loan (Education)" class="purpose-link">Fund Your Career →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
"""
        subnav_purposes = '<a class="subnav-link" href="#purposes">Life Goals</a>'

    faqs_html = "".join([f"""
          <details>
            <summary>{faq[0]}</summary>
            <p>{faq[1]}</p>
          </details>""" for faq in prod["faqs"]])

    pills_html = "".join([f"""
            <span class="hero-pill"><span class="dot"></span> {pill}</span>""" for pill in prod["pills"]])

    calc_html = f"""
          <div class="product-calc-card" data-loan-calculator="{prod['calc_type']}">
            <div class="calc-header">
              <div>
                <small class="calc-tag">{prod['calc_badge']}</small>
                <h3>{prod['calc_title']}</h3>
                <p>Instant estimate based on current lender slabs</p>
              </div>
            </div>

            {prod['calc_fields']}

            <div class="calc-result-box">
              <div class="calc-emi-headline">
                <small>Estimated Monthly EMI</small>
                <div class="calc-emi-val" id="calcEmiOut">₹10,747</div>
              </div>
              <div class="calc-submetrics">
                <div class="calc-submetric">
                  <small id="calcMetric2Label">Total Interest Payable</small>
                  <strong id="calcTotalInterest">₹1,44,817</strong>
                </div>
                <div class="calc-submetric">
                  <small id="calcMetric3Label">Total Repayment</small>
                  <strong id="calcTotalPayment">₹6,44,817</strong>
                </div>
              </div>
              <a href="#applyModal" class="btn btn-primary calc-apply-btn" data-open-modal data-product="{prod['name']}">Apply for this Loan ↗</a>
              <p class="calc-disclaimer">Illustrative estimation only. Actual terms subject to lender underwriting.</p>
            </div>
          </div>"""

    # If securities, custom result box was already included
    if prod['calc_type'] == 'securities':
        calc_html = f"""
          <div class="product-calc-card" data-loan-calculator="securities">
            <div class="calc-header">
              <div>
                <small class="calc-tag">{prod['calc_badge']}</small>
                <h3>{prod['calc_title']}</h3>
                <p>Instant credit line estimate against Demat portfolio</p>
              </div>
            </div>
            {prod['calc_fields']}
          </div>"""

    page_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{prod['description']}">
  <title>Finora {prod['name']} — Apply Online, Interest Rates & EMI Calculator</title>
  
  <link rel="icon" type="image/png" href="images/favicon.png">
  
  <!-- Fonts: Inter primary, with clean sans-serif fallback -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="style.css?v=10">
  <link rel="stylesheet" href="loan-product.css?v=1">
</head>
<body>

{get_header(prod['name'])}

  <!-- Breadcrumbs Bar -->
  <nav class="breadcrumbs-bar" aria-label="Breadcrumb">
    <div class="container">
      <ul class="breadcrumbs">
        <li><a href="index.html">Home</a></li>
        <li class="separator">›</li>
        <li><a href="index.html#loans">Loans</a></li>
        <li class="separator">›</li>
        <li class="current" aria-current="page">{prod['name']}</li>
      </ul>
    </div>
  </nav>

  <main>
    <!-- Split Hero Section -->
    <section class="product-hero" id="overview">
      <div class="container product-hero-grid">
        <div class="product-hero-copy">
          <div class="eyebrow">{prod['category']}</div>
          <h1>{prod['headline']}</h1>
          <p class="lead">{prod['description']}</p>
          
          <!-- Hero Persona Visual Card with Photo & Floating Badges -->
          <div class="hero-persona-card">
            <div class="persona-image-holder">
              <img src="{prod.get('hero_img', 'images/personal-loan-hero.jpg')}" alt="{prod['name']} Finora financing" class="persona-img" loading="eager">
              <div class="persona-badge-float top-right">
                <span class="badge-icon">{prod.get('badge1_icon', '⚡')}</span>
                <div>
                  <strong>{prod.get('badge1_title', 'Instant Disbursal')}</strong>
                  <small>{prod.get('badge1_sub', '100% Digital Process')}</small>
                </div>
              </div>
              <div class="persona-badge-float bottom-left">
                <span class="badge-icon">{prod.get('badge2_icon', '🛡️')}</span>
                <div>
                  <strong>{prod.get('badge2_title', 'Zero Hidden Fees')}</strong>
                  <small>{prod.get('badge2_sub', 'Transparent Terms')}</small>
                </div>
              </div>
            </div>
            <div class="persona-card-footer">
              <div class="persona-caption">
                <strong>{prod.get('caption_title', prod['name'] + ' for Life Milestones')}</strong>
                <span>{prod.get('caption_sub', 'Tailored financing with transparent bank interest rates.')}</span>
              </div>
              <div class="persona-user-stats">
                <div class="stars">★★★★★</div>
                <small>4.9/5 Verified</small>
              </div>
            </div>
          </div>

          <div class="hero-pill-list">
            {pills_html}
          </div>

          <div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap;">
            <a class="btn btn-primary" href="#applyModal" data-open-modal data-product="{prod['name']}">
              Apply for {prod['name']} <span>↗</span>
            </a>
            <a class="btn btn-outline" href="#calculator">
              Calculate EMI
            </a>
          </div>

          <div class="hero-rating-badge">
            <span class="stars">★★★★★</span>
            <span>4.9/5 verified rating from over 42,000+ Indian borrowers</span>
          </div>
        </div>

        <div class="product-hero-calc" id="calculator">
          {calc_html}
        </div>
      </div>
    </section>

    <!-- Key Benefits Strip -->
    <section class="benefits-strip" aria-label="Key Product Benefits">
      <div class="container benefits-grid">
        {benefits_html}
      </div>
    </section>

    <!-- Sticky In-Page Navigation Bar -->
    <nav class="sticky-subnav" aria-label="Product Sections Navigation">
      <div class="container subnav-track">
        <a class="subnav-link active" href="#overview">Overview</a>
        <a class="subnav-link" href="#calculator">EMI Calculator</a>
        {subnav_purposes}
        <a class="subnav-link" href="#features">Features</a>
        <a class="subnav-link" href="#eligibility">Eligibility</a>
        <a class="subnav-link" href="#rates">Rates & Fees</a>
        <a class="subnav-link" href="#documents">Documents</a>
        <a class="subnav-link" href="#apply">How to Apply</a>
        <a class="subnav-link" href="#faqs">FAQs</a>
      </div>
    </nav>

    {purposes_html}

    <!-- Features & Advantages Section -->
    <section class="section" id="features">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Product Advantages</span>
          <h2>Why choose Finora for your <span class="text-gradient-blue">{prod['name']}?</span></h2>
          <p>Experience transparent credit designed to empower your financial decisions with zero surprises.</p>
        </div>

        <div class="features-grid">
          {features_html}
        </div>
      </div>
    </section>

    <!-- Eligibility Criteria Section -->
    <section class="section soft-section" id="eligibility">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Clear Requirements</span>
          <h2>Eligibility criteria for <span class="text-gradient-blue">{prod['name']}</span></h2>
          <p>We work with leading Indian banks and NBFCs to ensure flexible, achievable eligibility parameters for both salaried and self-employed applicants.</p>
        </div>

        <div class="eligibility-split">
          <div class="eligibility-profile-card">
            <div class="profile-card-head">
              <img src="images/profile-salaried.jpg" alt="Salaried Professional" class="eligibility-avatar">
              <div>
                <h3>Salaried Applicants</h3>
                <small>MNC, Private Ltd, PSU & Govt Employees</small>
              </div>
            </div>
            <ul class="eligibility-list">
              {salaried_html}
            </ul>
          </div>

          <div class="eligibility-profile-card">
            <div class="profile-card-head">
              <img src="{prod.get('self_avatar', 'images/profile-doctor.jpg')}" alt="Self-Employed Professional" class="eligibility-avatar">
              <div>
                <h3>Self-Employed Individuals</h3>
                <small>Business Owners, Traders & Professionals</small>
              </div>
            </div>
            <ul class="eligibility-list">
              {self_html}
            </ul>
          </div>
        </div>

        <div style="background:#FFFFFF; border:1.5px solid #D5E0F2; border-radius:20px; padding:24px 30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; box-shadow:0 6px 18px rgba(8,40,95,0.05);">
          <div>
            <strong style="color:#0A1C3E; font-size:1.1rem; display:block;">Unsure about your exact eligibility score?</strong>
            <span style="color:#64748B; font-size:0.9rem;">Check in 60 seconds without affecting your credit rating.</span>
          </div>
          <a href="#applyModal" class="btn btn-primary" data-open-modal data-product="{prod['name']}">Check Eligibility Free ↗</a>
        </div>
      </div>
    </section>

    <!-- Rates & Fees Table -->
    <section class="section" id="rates">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Transparent Pricing</span>
          <h2>{prod['name']} <span class="text-gradient-blue">interest rates & charges</span></h2>
          <p>No fine print ambiguity. Review all standard charges and interest schedules upfront.</p>
        </div>

        <div class="rate-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fee Parameter</th>
                <th>Standard Rate / Charge</th>
                <th>Details & Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Interest Rate (APR)</strong></td>
                <td><span class="rate-badge">{prod['rate_range']}</span></td>
                <td>Determined by borrower credit score, employer category and debt-to-income ratio.</td>
              </tr>
              <tr>
                <td><strong>Processing Fee</strong></td>
                <td><strong>{prod['proc_fee']}</strong></td>
                <td>One-time fee deducted from loan disbursal proceeds.</td>
              </tr>
              <tr>
                <td><strong>Prepayment / Foreclosure</strong></td>
                <td><strong>{prod['foreclosure_fee']}</strong></td>
                <td>Pay off early to save overall interest expenditure.</td>
              </tr>
              <tr>
                <td><strong>Stamp Duty & Legal</strong></td>
                <td><strong>At Actuals (State-wise)</strong></td>
                <td>Governed strictly by respective State Government Stamp Acts.</td>
              </tr>
              <tr>
                <td><strong>Penal Interest</strong></td>
                <td><strong>2% per month on overdue EMI</strong></td>
                <td>Applicable only in the event of overdue installment default.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Required Documents Section -->
    <section class="section soft-section" id="documents">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Minimal Paperwork</span>
          <h2>Documents required for <span class="text-gradient-blue">{prod['name']}</span></h2>
          <p>Digitally verified documentation ensures fast-track sanction without tedious physical submission.</p>
        </div>

        <div class="docs-grid">
          <div class="doc-card">
            <div class="doc-card-icon">🪪</div>
            <h4>Identity Proof</h4>
            <ul>
              <li>Aadhaar Card (linked to mobile)</li>
              <li>PAN Card (mandatory)</li>
              <li>Valid Passport / Driving License</li>
              <li>Voter Identity Card</li>
            </ul>
          </div>

          <div class="doc-card">
            <div class="doc-card-icon">📍</div>
            <h4>Address Proof</h4>
            <ul>
              <li>Aadhaar Card</li>
              <li>Recent Utility Bill (Electricity/Gas)</li>
              <li>Registered Rent Agreement</li>
              <li>Bank Passbook / Statement</li>
            </ul>
          </div>

          <div class="doc-card">
            <div class="doc-card-icon">💼</div>
            <h4>Income Proof (Salaried)</h4>
            <ul>
              <li>Latest 3 months salary slips</li>
              <li>Latest 6 months bank statement</li>
              <li>Latest Form 16 / ITR acknowledgment</li>
              <li>Official Company ID Card</li>
            </ul>
          </div>

          <div class="doc-card">
            <div class="doc-card-icon">📊</div>
            <h4>Income Proof (Self-Employed)</h4>
            <ul>
              <li>Latest 2 years ITR with computation</li>
              <li>Audited Balance Sheet & P&L</li>
              <li>12 months GST returns</li>
              <li>Business existence proof (GST/Trade Lic)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 4-Step Application Journey -->
    <section class="section" id="apply">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Hassle-Free Process</span>
          <h2>How to apply for your <span class="text-gradient-blue">{prod['name']}</span></h2>
          <p>Complete your online loan journey in 4 straightforward steps from the comfort of your home.</p>
        </div>

        <div class="steps-timeline">
          <div class="step-card">
            <div class="step-num">1</div>
            <h4>Check Eligibility</h4>
            <p>Input your loan amount, tenure and employment details to receive instant indicative approval.</p>
          </div>

          <div class="step-card">
            <div class="step-num">2</div>
            <h4>Select Best Offer</h4>
            <p>Compare verified interest rate quotes and pick the EMI structure that best suits your goals.</p>
          </div>

          <div class="step-card">
            <div class="step-num">3</div>
            <h4>Digital Video KYC</h4>
            <p>Complete fast Aadhaar e-verification and a 3-minute video call on your smartphone.</p>
          </div>

          <div class="step-card">
            <div class="step-num">4</div>
            <h4>Direct Disbursal</h4>
            <p>E-sign your sanction letter and receive funds credited directly to your registered bank account.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Product FAQs Section -->
    <section class="section soft-section" id="faqs">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Got Questions?</span>
          <h2>Frequently asked questions about <span class="text-gradient-blue">{prod['name']}</span></h2>
          <p>Answers to standard queries to help you borrow with confidence.</p>
        </div>

        <div class="faq-list" style="max-width:850px;">
          {faqs_html}
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section class="section" style="padding-top:20px;">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Explore Alternatives</span>
          <h2>Other loan solutions you may <span class="text-gradient-blue">consider</span></h2>
        </div>
        <div class="product-grid">
          {related_html}
        </div>
      </div>
    </section>

    <!-- High-Impact Final CTA -->
    <section class="section" style="background:linear-gradient(135deg, #071E44 0%, #0A2860 100%); color:#FFFFFF; text-align:center; padding:72px 0;">
      <div class="container" style="max-width:760px;">
        <span class="eyebrow" style="background:rgba(255,255,255,0.12); color:#FDE68A; border-color:rgba(245,158,11,0.4);">READY TO BEGIN?</span>
        <h2 style="color:#FFFFFF; font-size:clamp(2rem, 3.8vw, 3rem); margin-bottom:16px;">Apply for your Finora {prod['name']} today</h2>
        <p style="color:#CBD5E1; font-size:1.12rem; line-height:1.6; margin-bottom:32px;">Experience fast-track digital approval, attractive rates from verified banking partners, and transparent support every step of the way.</p>
        <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
          <a class="btn btn-primary" href="#applyModal" data-open-modal data-product="{prod['name']}" style="padding:14px 32px; font-size:1.05rem;">
            Start Application <span>↗</span>
          </a>
          <a class="btn btn-outline" href="index.html#contact" style="background:rgba(255,255,255,0.1); color:#FFFFFF; border-color:rgba(255,255,255,0.3);">
            Talk to Loan Specialist
          </a>
        </div>
      </div>
    </section>
  </main>

{get_footer()}

  <!-- Interactive Scripts -->
  <script src="loan-engine.js?v=1"></script>
</body>
</html>
"""
    with open(prod["file"], "w", encoding="utf-8") as f:
        f.write(page_html)
    print(f"Generated {prod['file']}")

def update_index_page():
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Update header navigation with Loans Mega Menu
    header_replacement = get_header("Home")
    # Replace topbar and header
    pattern = r'<!-- Top Bar -->.*?<!-- Header Navigation -->.*?</header>'
    html = re.sub(pattern, header_replacement, html, flags=re.DOTALL)

    # 2. Add loan-product.css link in head
    if 'loan-product.css' not in html:
        html = html.replace('<link rel="stylesheet" href="style.css?v=10">', '<link rel="stylesheet" href="style.css?v=10">\n  <link rel="stylesheet" href="loan-product.css?v=1">')

    # 3. Add loan-engine.js script tag before closing body
    if 'loan-engine.js' not in html:
        html = html.replace('</body>', '  <script src="loan-engine.js?v=1"></script>\n</body>')

    # 4. Update the 12/13 product cards in #loans so each card links to its dedicated page
    card_links = {
        "Personal Loan": "personal-loan.html",
        "Insta Personal Loan": "insta-personal-loan.html",
        "Business Loan": "business-loan.html",
        "Home Loan": "home-loan.html",
        "Loan Against Property": "loan-against-property.html",
        "Gold Loan": "gold-loan.html",
        "Education Loan": "education-loan.html",
        "Car & Two-Wheeler Loans": "car-loan.html",
        "Medical Loan": "medical-loan.html",
        "Loan Against Securities": "loan-against-securities.html",
        "Debt Consolidation Loan": "debt-consolidation-loan.html",
        "Easy EMI Loan": "easy-emi-loan.html"
    }

    # Replace links inside product-card-footer
    for title, link in card_links.items():
        # Find <h3>{title}</h3> and replace the following <a class="text-link" href="...">
        escaped_title = re.escape(title)
        pattern = rf'(<h3>{escaped_title}</h3>.*?<div class="product-card-footer">\s*<a class="text-link" href=")[^"]+(">[^<]+→</a>)'
        html = re.sub(pattern, rf'\g<1>{link}\g<2>', html, flags=re.DOTALL)

    # Also add the 13th product card ("Two-Wheeler Loan") right after Car Loan if not present
    if 'two-wheeler-loan.html' not in html:
        two_wheeler_card = """
          <!-- 8b. Two-Wheeler Loan -->
          <article class="product-card" data-category="personal">
            <div class="product-card-img">
              <img src="images/loan-vehicle.jpg" alt="Two-Wheeler Loan motorcycle and EV" loading="lazy">
              <span class="product-card-badge">Zero Down Payment</span>
            </div>
            <div class="product-card-body">
              <h3>Two-Wheeler Loan</h3>
              <p>Instant approval for commuter bikes, sports motorcycles and electric two-wheelers with low EMIs.</p>
              <div class="product-card-footer">
                <a class="text-link" href="two-wheeler-loan.html">Explore two-wheeler loan →</a>
              </div>
            </div>
          </article>"""
        # Insert after Car & Two-Wheeler Loans
        html = html.replace('<!-- 9. Medical Loan -->', f'{two_wheeler_card}\n\n          <!-- 9. Medical Loan -->')

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("Updated index.html with Mega Menu and direct product links")

if __name__ == "__main__":
    for prod in PRODUCTS:
        generate_product_page(prod)
    update_index_page()
    print("All 13 product pages generated and index.html updated successfully!")
