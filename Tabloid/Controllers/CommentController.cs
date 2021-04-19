using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_commentRepository.GetAllCommentsByPostId( id));
        }

       [HttpPost] IActionResult AddComent(Comment comment)
        {
            DateTime dateCreated = DateTime.Now;
            comment.CreateDateTime = dateCreated;

            _commentRepository.AddComment(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }
    }
}
