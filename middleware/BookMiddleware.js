const multer = require("multer");
const fs = require("fs");
const path = require("path");
const DiskSTorage = require("../Utils/multer");

const folder = path.join(process.cwd(), "/public/img-events");
const diskStorage = new DiskSTorage(
	path.join(process.cwd(), "/public/img-events/"),
);

const upload = multer({
	storage: diskStorage._storage,
	limits: diskStorage._limits,
	fileFilter: diskStorage._filterFile,
}).single("image_event");

exports.uploads = (req, res, next) => {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
	}
	upload(req, res, (err) => {
		if (err) {
			return badRequestError(err.message, res);
		}

		if (!req.file) {
			// return badRequestError("Tolong masukkan file !", res);
			return next();
		}
		req.body.image_event = req.file.filename;
		next();
	});
};