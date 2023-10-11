// import { Token } from "../models/token";
// export const createToken = async (
//   organizationId: string,
//   token: string,
//   maxUses: number,
//   expiresAt: number
// ) => {
//   const now = new Date();
//   const futureDate = new Date(now.getTime() + expiresAt * 24 * 60 * 60 * 1000);
//   try {
//     const newToken = new Token({
//       organization: organizationId,
//       token,
//       maxUses,
//       expiresAt: futureDate
//     });
//     await newToken.save();
//     return newToken;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error creating token");
//   }
// };
// export const verifyToken = async (token: string) => {
//   try {
//     const tokenDoc = await Token.findOne({ token });
//     if (!tokenDoc) {
//       return null;
//     }
//     if (tokenDoc.currentUses >= tokenDoc.maxUses) {
//       return null;
//     }
//     if (tokenDoc.expiresAt < Date.now()) {
//       return null;
//     }
//     tokenDoc.currentUses += 1;
//     await tokenDoc.save();
//     return tokenDoc;
//   } catch (error) {
//     throw new Error("Error verifying token");
//   }
// };
// module.exports = {
//   createToken,
//   verifyToken
// };
//# sourceMappingURL=tokenMethods.js.map