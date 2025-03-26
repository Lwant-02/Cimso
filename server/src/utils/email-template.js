export const generateConfrimTemplate = ({
  userName,
  courseTitle,
  courseImage,
  price,
  location,
  dateTime,
  golfer,
  hole,
  packageName,
  email,
}) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="background-color: #4a90e2; text-align: center; padding: 20px;">
                    <p style="font-size: 36px; line-height: 42px; font-weight: 700; color: #ffffff !important;">Your Booking is Confirmed! 🎉</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px;">
                    <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">${userName}</strong>,</p>
                    
                    <p style="font-size: 16px; margin-bottom: 25px;">Thank you for choosing our online golf booking! We are thrilled to have you on board and can’t wait for you to experience an amazing day at the golf course.</p>
  
                    <p style="font-size: 16px; margin-bottom: 25px;">Below is your upcoming session details and your receipt:</p>
  
                    <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                            <td colspan="2" style="text-align: center; padding: 15px;">
                                <img src="${courseImage}" alt="${courseTitle}" style="width: 100%; max-width: 500px; border-radius: 8px;">
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                                <strong>Email Address:</strong> ${email}
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                                <strong>Course name:</strong> ${courseTitle}
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                                <strong>Number of Golfer:</strong> ${golfer}
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                                <strong>Hole:</strong> ${hole}
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                                <strong>Package name:</strong> ${
                                  packageName ? packageName : "none"
                                }
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                                <strong>Location:</strong> ${location}
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                                <strong>Date & Time:</strong> ${dateTime}
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px;">
                                <strong>Price:</strong> ${price}฿
                            </td>
                        </tr>
                    </table>
  
                    <p style="font-size: 16px; margin-bottom: 25px;">
                        Get ready to enjoy the fresh air, lush greens, and the perfect swing! Whether you're refining your skills or just having fun, we hope this session brings you relaxation and great memories.
                    </p>
  
                    <p style="font-size: 16px; margin-bottom: 25px;">
                        If you need to make any changes to your booking, feel free to visit our <a href="#" style="color: #4a90e2; text-decoration: none;">support page</a>. We're always happy to assist you.
                    </p>
  
                    <p style="font-size: 16px; margin-top: 30px;">
                        Wishing you a fantastic day on the course!<br>
                        <strong>Cimso</strong>
                    </p>
                </td>
            </tr>
            <tr>
                <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0 0 10px;">
                        Cimso Online Golf Booking Inc. 
                    </p>
                    <p style="margin: 0;">
                        <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                        <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                        <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                    </p>
                    <p style="margin-top: 20px; font-size: 12px; color: #888;">
                      Please note: This email was sent automatically. There is no need to reply. If you have any questions or need assistance, feel free to contact our support team via the link above.
                  </p>
                </td>
            </tr>
        </table>
    </div>
  `;

export const generateBookingCancellationTemplate = ({
  userName,
  courseName,
  courseImage,
  price,
  cancellationDate,
}) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="background-color: #e74c3c; text-align: center; padding: 20px;">
                    <p style="font-size: 54px; line-height: 54px; font-weight: 800; color: #ffffff;">Booking Cancelled✅</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px;">                
                    <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #e74c3c;">${userName}</strong>,</p>
                    
                    <p style="font-size: 16px; margin-bottom: 25px;">Your booking has successfully canceled and below is the detail of your booking:</p>
                    
                    <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f9e5e5; border-radius: 10px; margin-bottom: 25px;">
                        <tr>
                            <td style="font-size: 16px; text-align: center;">
                                <img src="${courseImage}" alt="Course Image" style="max-width: 100%; height: auto; border-radius: 10px;">
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #e2b1b1;">
                                <strong>Course:</strong> ${courseName}
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="font-size: 16px; border-bottom: 1px solid #e2b1b1;">
                                <strong>Price:</strong> ${price}฿
                            </td>
                        </tr>
                    </table>
  
                    <p style="font-size: 16px; margin-bottom: 25px;">The cancellation was processed on <strong>${cancellationDate}</strong>.</p>
                    <p style="font-size: 16px; margin-top: 30px;">We hope to see you back soon for your next round of golf! If you decide to rebook or have any questions, we're always here to assist you.</p>
                    <p style="font-size: 16px; margin-top: 30px;">If you have any questions or need to make another booking, feel free to <a href="mailto:support@yourdomain.com" style="color: #e74c3c; text-decoration: none;">contact our support team</a>.</p>
                    
                    <p style="font-size: 16px; margin-top: 30px;">
                        Best regards,<br>
                        <strong>Cimso</strong>
                    </p>
                </td>
            </tr>
            <tr>
                <td style="background-color: #f9e5e5; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0 0 10px;">
                        Cimso Online Golf Booking Inc. 
                    </p>
                    <p style="margin: 0;">
                        <a href="#" style="color: #e74c3c; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                        <a href="#" style="color: #e74c3c; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                        <a href="#" style="color: #e74c3c; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                    </p>
                </td>
            </tr>
        </table>
    </div>
    `;

export const generateWelcomeEmailTemplate = ({ userName }) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="background-color: #2ecc71; text-align: center; padding: 20px;">
                    <p style="font-size: 54px; line-height: 54px; font-weight: 800; color:#ffffff !important;">Welcome Aboard! 🎉</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px;">                
                    <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #2ecc71;">${userName}</strong>,</p>
                    
                    <p style="font-size: 16px; margin-bottom: 25px;">We’re thrilled to have you as a part of our community! Your account has been successfully created, and you’re now ready to explore and book your next golf adventure with us.</p>
                    
                    <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #eaf9f1; border-radius: 10px; margin-bottom: 25px;">
                        <tr>
                            <td style="font-size: 16px; text-align: center;">
                                <img src="https://www.cimso.com/wp-content/uploads/2020/01/cimso-logo-300-transparent.png" alt="Welcome" style="max-width: 100%; height: auto; border-radius: 10px;">
                            </td>
                        </tr>
                    </table>
  
                    <p style="font-size: 16px; margin-bottom: 25px;">Here’s what you can do next:</p>
                    <ul style="font-size: 16px; padding-left: 20px; margin-bottom: 25px;">
                        <li>🏌️‍♂️ Browse and book top golf courses</li>
                        <li>📅 Manage your bookings effortlessly</li>
                        <li>💬 Get exclusive golf tips & offers</li>
                    </ul>

                    <p style="font-size: 16px; margin-bottom: 25px;">Click the button below to get started:</p>
                    
                    <p style="text-align: center;">
                        <a href="https://cimso-golf-booking-demo.onrender.com" style="background-color: #2ecc71; color: #ffffff; padding: 12px 24px; border-radius: 5px; font-size: 18px; text-decoration: none; display: inline-block;">
                            Start Exploring ⛳
                        </a>
                    </p>

                    <p style="font-size: 16px; margin-top: 30px;">If you have any questions or need assistance, feel free to <a href="mailto:support@yourdomain.com" style="color: #2ecc71; text-decoration: none;">contact our support team</a>.</p>
                    
                    <p style="font-size: 16px; margin-top: 30px;">
                        Best regards,<br>
                        <strong>Cimso Team</strong>
                    </p>
                </td>
            </tr>
            <tr>
                <td style="background-color: #eaf9f1; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0 0 10px;">
                        Cimso Online Golf Booking Inc.
                    </p>
                    <p style="margin: 0;">
                        <a href="#" style="color: #2ecc71; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                        <a href="#" style="color: #2ecc71; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                        <a href="#" style="color: #2ecc71; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                    </p>
                </td>
            </tr>
        </table>
    </div>
`;

export const generateTournamentConfirmationEmail = ({
  name,
  email,
  phone,
  tournamentName,
  date,
  time,
  location,
}) => `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <tr>
                  <td style="background-color: #3498db; text-align: center; padding: 20px;">
                      <p style="font-size: 48px; font-weight: 800; color: #ffffff;">Tournament Registration Confirmed! 🏌️‍♂️</p>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 40px 30px;">
                      <p style="font-size: 16px; margin-bottom: 25px;">Dear <strong style="color: #3498db;">${name}</strong>,</p>
  
                      <p style="font-size: 16px; margin-bottom: 25px;">Congratulations! Your registration for the **${tournamentName}** has been successfully received. We are excited to have you join us on this thrilling golf tournament!</p>
  
                      <table cellpadding="10" cellspacing="0" border="0" width="100%" style="background-color: #eaf2fb; border-radius: 10px; margin-bottom: 25px;">
                          <tr>
                              <td style="font-size: 16px; padding: 15px;">
                                  <strong>Tournament Details:</strong><br>
                                  🏆 <strong>Event:</strong> ${tournamentName} <br>
                                  📅 <strong>Date:</strong> ${date} <br>
                                  ⏰ <strong>Time:</strong> ${time} <br>
                                  📍 <strong>Location:</strong> ${location} <br>
                              </td>
                          </tr>
                      </table>
  
                      <p style="font-size: 16px; margin-bottom: 25px;">Here’s your contact information:</p>
                      <ul style="font-size: 16px; padding-left: 20px; margin-bottom: 25px;">
                          <li>📧 Email: ${email}</li>
                          <li>📞 Phone: ${phone}</li>
                      </ul>
  
                      <p style="font-size: 16px; margin-bottom: 25px;">If you have any questions or need to update your details, please contact us at <a href="mailto:support@yourdomain.com" style="color: #3498db; text-decoration: none;">cimsosupport@gmil.com</a>.</p>
  
                      <p style="text-align: center; margin-top: 30px;">
                          <a href="https://cimso-golf-booking-demo.onrender.com/tournament" style="background-color: #3498db; color: #ffffff; padding: 12px 24px; border-radius: 5px; font-size: 18px; text-decoration: none; display: inline-block;">
                              View Tournament Details ⛳
                          </a>
                      </p>
  
                      <p style="font-size: 16px; margin-top: 30px;">
                          We look forward to seeing you on the green!<br>
                          <strong>The Tournament Team</strong>
                      </p>
                  </td>
              </tr>
              <tr>
                  <td style="background-color: #eaf2fb; padding: 20px; text-align: center; font-size: 14px;">
                      <p style="margin: 0 0 10px;">
                          Cimso Online Golf Booking Inc.
                      </p>
                      <p style="margin: 0;">
                          <a href="#" style="color: #3498db; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                          <a href="#" style="color: #3498db; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                          <a href="#" style="color: #3498db; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                      </p>
                  </td>
              </tr>
          </table>
      </div>
  `;

export const generateTournamentCertificateEmail = ({
  playerName,
  tournamentName,
  date,
  location,
  position,
}) => `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <tr>
                  <td style="background-color: #3498db; text-align: center; padding: 20px;">
                      <p style="font-size: 32px; font-weight: 800; color: #ffffff;">Tournament Certificate 🏆</p>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 40px 30px;">
                      <p style="font-size: 16px; margin-bottom: 25px;">Dear <strong style="color: #3498db;">${playerName}</strong>,</p>
  
                      <p style="font-size: 16px; margin-bottom: 25px;">Congratulations on your participation in the <strong>${tournamentName}</strong>! We are pleased to attach your official tournament certificate recognizing your achievement.</p>
  
                      <table cellpadding="10" cellspacing="0" border="0" width="100%" style="background-color: #eaf2fb; border-radius: 10px; margin-bottom: 25px;">
                          <tr>
                              <td style="font-size: 16px; padding: 15px;">
                                  <strong>Tournament Details:</strong><br>
                                  🏆 <strong>Event:</strong> ${tournamentName} <br>
                                  📅 <strong>Date:</strong> ${date} <br>
                                  📍 <strong>Location:</strong> ${location} <br>
                                  🥇 <strong>Achievement:</strong> ${position} <br>
                              </td>
                          </tr>
                      </table>
  
                      <p style="font-size: 16px; margin-bottom: 25px;">Your official certificate is attached to this email as a PDF. Please feel free to print and display it with pride!</p>
  
                      <p style="font-size: 16px; margin-bottom: 25px;">If you have any questions or need any corrections to your certificate, please contact us at <a href="mailto:support@cimsogolf.com" style="color: #3498db; text-decoration: none;">cimsosupport@gmail.com</a>.</p>
  
                      <p style="text-align: center; margin-top: 30px;">
                          <a href="https://cimso-golf-booking-demo.onrender.com/tournament" style="background-color: #3498db; color: #ffffff; padding: 12px 24px; border-radius: 5px; font-size: 18px; text-decoration: none; display: inline-block;">
                              View All Tournament Results ⛳
                          </a>
                      </p>
  
                      <p style="font-size: 16px; margin-top: 30px;">
                          Thank you for participating and we hope to see you at future tournaments!<br>
                          <strong>The Tournament Team</strong>
                      </p>
                  </td>
              </tr>
              <tr>
                  <td style="background-color: #eaf2fb; padding: 20px; text-align: center; font-size: 14px;">
                      <p style="margin: 0 0 10px;">
                          Cimso Online Golf Booking Inc.
                      </p>
                      <p style="margin: 0;">
                          <a href="#" style="color: #3498db; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                          <a href="#" style="color: #3498db; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                          <a href="#" style="color: #3498db; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                      </p>
                  </td>
              </tr>
          </table>
      </div>
  `;
